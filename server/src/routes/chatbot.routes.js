import {Router} from 'express';
import { 
  processChat, 
  getAllChatSessions,
  getChatSession,
  deleteChatSession,
  updateChatSessionTitle,
  clearAllChatSessions
} from '../controllers/chatbot.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';


const router = Router();

// Middleware to verify JWT token for all routes in this file
router.use(verifyJWT);

// Chat routes
router.post('/chat', processChat);

// Chat session routes
router.get('/sessions', getAllChatSessions);
router.get('/sessions/:sessionId',getChatSession);
router.delete('/sessions/:sessionId', deleteChatSession);
router.patch('/sessions/:sessionId/title', updateChatSessionTitle);

// Search history routes
// router.get('/search-history', getSearchHistory);
router.delete('/sessions', clearAllChatSessions);

export default router;