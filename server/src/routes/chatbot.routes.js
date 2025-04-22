import { Router } from 'express';
import { 
  processChat,
  processImageUpload,
  getAllChatSessions,
  getChatSession,
  deleteChatSession,
  updateChatSessionTitle,
  clearAllChatSessions
} from '../controllers/chatbot.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import upload, { uploadToCloudinary } from '../utils/cloudinary.js';

const router = Router();

// Middleware to verify JWT token for all routes in this file
router.use(verifyJWT);

// Chat routes
router.post('/chat', processChat);

// Image upload route - use local storage first
router.post('/upload-image', upload.single('medicalImage'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // Upload to Cloudinary
    const result = await uploadToCloudinary(req.file.path);
    
    // Add cloudinary data to request object for the controller
    req.file.cloudinary = {
      url: result.secure_url,
      public_id: result.public_id,
      resource_type: result.resource_type
    };
    
    next(); // Pass to processImageUpload controller
  } catch (error) {
    return res.status(500).json({ 
      error: 'Failed to upload file to Cloudinary',
      message: error.message 
    });
  }
}, processImageUpload);

// Chat session routes
router.get('/sessions', getAllChatSessions);
router.get('/sessions/:sessionId', getChatSession);
router.delete('/sessions/:sessionId', deleteChatSession);
router.patch('/sessions/:sessionId/title', updateChatSessionTitle);
router.delete('/sessions', clearAllChatSessions);

export default router;