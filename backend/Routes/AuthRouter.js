import express from "express"
import { Router } from 'express';
import { loginValidation } from '../Middlewares/AuthValidation.js';
import { login } from '../Controllers/AuthController.js';

const router = express.Router();

/**
 * POST /auth/login
 * Body: { name, email, password, role }
 * Response: { success, message, user }
 */
router.post('/', loginValidation, login);

export default router;

