import { Groq } from 'groq-sdk';
import dotenv from 'dotenv';
import cloudinary from '../utils/cloudinaryConfig.js';
import { ChatSession } from '../models/chatSession.model.js';

dotenv.config();

// Initialize Groq API
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// Helper function to convert chat history to Groq format
const formatChatHistory = (context) => {
  if (!Array.isArray(context)) return [];
  
  return context.map(msg => {
    // Base message
    const formattedMsg = {
      role: msg.role,
      content: msg.attachment?.url ? [] : msg.content
    };
    
    // For messages with attachments, format as multimodal content
    if (msg.attachment?.url) {
      formattedMsg.content = [
        { type: "text", text: msg.content },
        { type: "image_url", image_url: { url: msg.attachment.url } }
      ];
    }
    
    return formattedMsg;
  });
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

  const systemPrompt = `You are a medical assistant AI with vision capabilities. Consider the user's health profile while providing advice:
${userProfile}

When analyzing medical documents or images:
1. For test reports: Identify key markers, explain abnormal values, and summarize the overall health implications
2. For prescriptions: List medications, dosages, and their purposes
3. For medical scans or visual data: Describe visible features without making definitive diagnoses
4. For text-heavy medical documents: Organize and summarize key information in plain language
5. When identifying medications: Briefly explain their common uses and how they relate to potential conditions

Provide:
1. Information about possible conditions based on symptoms, considering the user's health metrics
2. General medical information and advice considering the user's health metrics if applicable
3. Specific home remedies suitable for their body type and condition
4. Discuss medications, their uses, and effects when asked
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

// Process image upload
const processImageUpload = async (req, res) => {
  try {
    if (!req.file || !req.file.cloudinary) {
      return res.status(400).json({ error: 'No image file uploaded or processing failed' });
    }

    const { sessionId, message } = req.body;
    const user = req.user;

    // Access Cloudinary image data from req.file.cloudinary
    const imageUrl = req.file.cloudinary.url;
    const publicId = req.file.cloudinary.public_id;

    // Find or create chat session
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

    // Use the user's message if provided, otherwise use the default message
    const userMessage = message && message.trim() !== "" 
      ? message 
      : "I've uploaded a medical document. Can you analyze it and explain what it says in simple terms?";
    
    // Add user message with attachment to the session
    session.messages.push({
      role: "user",
      content: userMessage,
      attachment: {
        type: 'image',
        url: imageUrl,
        public_id: publicId,
        originalName: req.file.originalname
      }
    });

    // Get the context from the session
    const context = session.messages;

    // Format the chat history for Groq
    const chatHistory = formatChatHistory(context);
    
    // Create the system prompt with user profile
    const systemPrompt = createMedicalPrompt(userMessage, user);
    
    try {
      // Call Groq API with multimodal capability
      const completion = await groq.chat.completions.create({
        model: process.env.GROQ_MODEL_ID || "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
          { role: "system", content: systemPrompt },
          ...chatHistory
        ],
        max_completion_tokens: 1000,
        temperature: 0.7,
        top_p: 0.8,
      });
      
      if (!completion.choices || completion.choices.length === 0) {
        throw new Error('No response received');
      }

      const responseText = completion.choices[0].message.content;
      const finalResponse = `${responseText}\n\nPlease consult a healthcare provider for proper medical advice.`;

      // Add the assistant response to the session
      session.messages.push({
        role: "assistant", 
        content: finalResponse
      });
      
      // Update the session last modified time
      session.updatedAt = Date.now();
      
      // If this is a new session, set the title based on image
      if (!sessionId && session.title.startsWith('Chat ')) {
        session.title = `Medical Document Analysis - ${new Date().toLocaleDateString()}`;
      }
      
      // Save the session
      await session.save();

      return res.json({
        message: finalResponse,
        sessionId: session._id,
        context: session.messages,
        imageUrl: imageUrl
      });
      
    } catch (apiError) {
      console.error('API error:', apiError);
      
      if (apiError.message?.includes('content_filter') || apiError.message?.includes('safety')) {
        return res.status(400).json({
          message: 'Unable to process this medical document. Please try uploading a clearer image or contact support.'
        });
      }
      
      throw apiError;
    }

  } catch (error) {
    console.error('Error in processImageUpload:', error);
    res.status(500).json({ 
      error: 'Failed to process image',
      message: 'We encountered an issue processing your medical document. Please try again or upload a clearer image.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
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

    // Format the chat history for Groq - this now handles images correctly
    const chatHistory = formatChatHistory(context);
    
    // Create the system prompt with user profile
    const systemPrompt = createMedicalPrompt(message, user);
    
    try {
      // Call Groq API - using the same model to maintain consistency
      const completion = await groq.chat.completions.create({
        model: process.env.GROQ_MODEL_ID ||"meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
          { role: "system", content: systemPrompt },
          ...chatHistory,
          { role: "user", content: message }
        ],
        max_completion_tokens: 800,
        temperature: 0.7,
        top_p: 0.8,
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

// Delete a chat session - with Cloudinary cleanup
const deleteChatSession = async (req, res) => {
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
    
    // Delete associated image files from Cloudinary before deleting the session
    for (const message of session.messages) {
      if (message.attachment && message.attachment.public_id) {
        try {
          await cloudinary.uploader.destroy(message.attachment.public_id);
          console.log(`Deleted Cloudinary image: ${message.attachment.public_id}`);
        } catch (cloudinaryErr) {
          console.error(`Error deleting Cloudinary image ${message.attachment.public_id}:`, cloudinaryErr);
        }
      }
    }
    
    // Delete the session
    await ChatSession.deleteOne({ _id: sessionId, userId });
      
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

// Clear all chat sessions with Cloudinary cleanup
const clearAllChatSessions = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Find all sessions to get file paths before deletion
    const sessions = await ChatSession.find({ userId });
    
    // Delete associated files from Cloudinary
    for (const session of sessions) {
      for (const message of session.messages) {
        if (message.attachment && message.attachment.public_id) {
          try {
            await cloudinary.uploader.destroy(message.attachment.public_id);
            console.log(`Deleted Cloudinary image: ${message.attachment.public_id}`);
          } catch (cloudinaryErr) {
            console.error(`Error deleting Cloudinary image ${message.attachment.public_id}:`, cloudinaryErr);
          }
        }
      }
    }
    
    // Delete all sessions for this user
    await ChatSession.deleteMany({ userId });
      
    return res.json({ message: 'All chat sessions cleared successfully' });
  } catch (error) {
    console.error('Error clearing chat sessions:', error);
    return res.status(500).json({ error: 'Failed to clear chat sessions' });
  }
};

export {
  processChat,
  processImageUpload,
  getAllChatSessions,
  getChatSession,
  deleteChatSession,
  updateChatSessionTitle,
  clearAllChatSessions
};