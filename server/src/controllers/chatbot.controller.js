import { Groq } from 'groq-sdk';
import dotenv from 'dotenv';
import { ChatSession } from '../models/chatSession.model.js';
// import { SearchHistory } from '../models/searchHistory.model.js';


dotenv.config();

// Initialize Groq API
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

console.log('Groq API Key:', process.env.GROQ_API_KEY);

// Helper function to convert chat history to Groq format
const formatChatHistory = (context) => {
  if (!Array.isArray(context)) return [];
  
  return context.map(msg => ({
    role: msg.role,
    content: msg.content
  }));
};

const createMedicalPrompt = (userMessage, user) => {
    const { bloodGroup, height, weight } = user?.info || {};
  
    // Calculate BMI if height and weight are available
    let bmi;
    if (height && weight) {
      // Convert height to meters if in cm
      const heightInMeters = height > 3 ? height / 100 : height;
      bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    }

    const userProfile = `
    User Health Profile:
    ${bloodGroup ? `- Blood Group: ${bloodGroup}` : '- Blood Group: Not provided'}
    ${height ? `- Height: ${height}cm` : '- Height: Not provided'}
    ${weight ? `- Weight: ${weight}kg` : '- Weight: Not provided'}
    ${bmi ? `- BMI: ${bmi}` : ''}`;

  const systemPrompt = `You are a medical assistant AI. Consider the user's health profile while providing advice:
${userProfile}

Provide:
1. Information about possible conditions based on symptoms, considering the user's health metrics
2. General medical information and advice considering the user's health metrics if applicable
3. Specific home remedies suitable for their body type and condition
4. Discuss medications, their uses, and effects when asked, noting any specific considerations based on their health profile
5. Blood group specific dietary and lifestyle recommendations when asked
6. BMI-specific health considerations and advice when asked

Keep responses:
- Direct and clear
- Using clinical terms for sensitive topics
- Educational without making diagnoses
- Professional but easy to understand
- Considerate of the user's specific health metrics
- If you can't provide a response, let the user know

Add a brief reminder about consulting a doctor.`;

  return systemPrompt;
};

// Process chat message
const processChat = async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    const user = req.user;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Find or create the chat session
    let session;
    if (sessionId) {
      session = await ChatSession.findOne({ 
        _id: sessionId,
        userId: user._id 
      });
      
      if (!session) {
        return res.status(404).json({ error: 'Chat session not found' });
      }
    } else {
      // Create a new session
      session = new ChatSession({
        userId: user._id,
        messages: []
      });
    }

    // Get the context from the session
    const context = session.messages;

    // Format the chat history for Groq
    const chatHistory = formatChatHistory(context);
    
    // Create the system prompt with user profile
    const systemPrompt = createMedicalPrompt(message, user);
    
    try {
      // Call Groq API
      const completion = await groq.chat.completions.create({
        model: process.env.GROQ_MODEL_ID || "llama3-70b-8192",
        messages: [
          { role: "system", content: systemPrompt },
          ...chatHistory,
          { role: "user", content: message }
        ],
        max_tokens: 800,
        temperature: 0.7,
        top_p: 0.8,
        // top_k: 40,
      });
      
      if (!completion.choices || completion.choices.length === 0) {
        throw new Error('No response received');
      }

      const responseText = completion.choices[0].message.content;
      const finalResponse = `${responseText}\n\nPlease consult a healthcare provider for proper medical advice.`;

      // Add the new messages to the session
      session.messages.push(
        { role: "user", content: message },
        { role: "assistant", content: finalResponse }
      );
      
      // Update the session last modified time
      session.updatedAt = Date.now();
      
      // If this is a new session, set the title based on the first message
      if (!sessionId && session.title.startsWith('Chat ')) {
        session.title = message.substring(0, 30) + (message.length > 30 ? '...' : '');
      }
      
      // Save the session
      await session.save();
      
      // // Save to search history
      // await new SearchHistory({
      //   userId: user._id,
      //   query: message
      // }).save();

      return res.json({
        message: finalResponse,
        sessionId: session._id,
        context: session.messages
      });
      
    } catch (apiError) {
      console.error('API error:', apiError);
      
      if (apiError.message?.includes('content_filter') || apiError.message?.includes('safety')) {
        return res.status(400).json({
          message: 'Please rephrase your question using medical terminology for a more detailed response.'
        });
      }
      
      throw apiError;
    }

  } catch (error) {
    console.error('Error in processChat:', error);
    res.status(500).json({ 
      error: 'Failed to process request',
      message: 'Please try asking your question differently.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get all chat sessions for a user
const getAllChatSessions = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const sessions = await ChatSession.find({ userId })
      .select('_id title updatedAt createdAt')
      .sort({ updatedAt: -1 });
      
    return res.json({ sessions });
  } catch (error) {
    console.error('Error fetching chat sessions:', error);
    return res.status(500).json({ error: 'Failed to fetch chat sessions' });
  }
};

// Get a specific chat session
const getChatSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user._id;
    
    const session = await ChatSession.findOne({ 
      _id: sessionId,
      userId 
    });
    
    if (!session) {
      return res.status(404).json({ error: 'Chat session not found' });
    }
      
    return res.json({ session });
  } catch (error) {
    console.error('Error fetching chat session:', error);
    return res.status(500).json({ error: 'Failed to fetch chat session' });
  }
};

// Delete a chat session
const deleteChatSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user._id;
    
    const result = await ChatSession.deleteOne({ 
      _id: sessionId,
      userId 
    });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Chat session not found' });
    }
      
    return res.json({ message: 'Chat session deleted successfully' });
  } catch (error) {
    console.error('Error deleting chat session:', error);
    return res.status(500).json({ error: 'Failed to delete chat session' });
  }
};

// Update chat session title
const updateChatSessionTitle = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { title } = req.body;
    const userId = req.user._id;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    const session = await ChatSession.findOneAndUpdate(
      { _id: sessionId, userId },
      { title },
      { new: true }
    );
    
    if (!session) {
      return res.status(404).json({ error: 'Chat session not found' });
    }
      
    return res.json({ session });
  } catch (error) {
    console.error('Error updating chat session title:', error);
    return res.status(500).json({ error: 'Failed to update chat session title' });
  }
};

// Get search history
// const getSearchHistory = async (req, res) => {
//   try {
//     const userId = req.user._id;
    
//     // Get the search history for the user, sorted by most recent
//     const history = await SearchHistory.find({ userId })
//       .sort({ timestamp: -1 })
//       .limit(20); // Limit to the last 20 searches
      
//     return res.json({ history });
//   } catch (error) {
//     console.error('Error fetching search history:', error);
//     return res.status(500).json({ error: 'Failed to fetch search history' });
//   }
// };

// Clear all chat sessions
const clearAllChatSessions = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Delete all search history for this user
    await ChatSession.deleteMany({ userId });
      
    return res.json({ message: 'All chat sessions cleared successfully' });
  } catch (error) {
    console.error('Error clearing chat sessions:', error);
    return res.status(500).json({ error: 'Failed to clear chat sessions' });
  }
};

export {
  processChat,
  getAllChatSessions,
  getChatSession,
  deleteChatSession,
  updateChatSessionTitle,
  // getSearchHistory,
  // clearSearchHistory
  clearAllChatSessions
};