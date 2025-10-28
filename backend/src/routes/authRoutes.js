import express from 'express';
import { loginUser, getCurrentUser } from '../controllers/authController.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

// Login route - creates or updates user in database
router.post('/login', authenticateUser, loginUser);

// Get current user route
router.get('/me', authenticateUser, getCurrentUser);

export default router;
