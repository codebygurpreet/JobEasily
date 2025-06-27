import express from 'express';
import UserController from '../controllers/user.controller.js';
import validateRecruiter from '../middlewares/validateRecruiter.middleware.js'

const router = express.Router();
const userController = new UserController();

// -------------------- Authentication Routes -------------------- //

// Register a new recruiter (POST)
router.post('/register', validateRecruiter,  userController.handleRegister);

// Render the login page (GET)
router.get('/login', userController.renderLoginPage);

// Handle login submission (POST)
router.post('/login', userController.handleLogin);

// Logout and clear session (GET)
router.get('/logout', userController.handleLogout);

export default router;
