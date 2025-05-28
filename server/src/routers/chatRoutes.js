import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js'
import chatController from '../controllers/chatController.js';

const router = Router();

router.get('/history', authMiddleware.protect, chatController.getChatHistory);
router.post('/message', authMiddleware.protect, chatController.addMessage);

export default router;