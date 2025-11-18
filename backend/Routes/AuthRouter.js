import { Router } from 'express';
import { loginValidation } from '../Middlewares/AuthValidation.js';
import { login } from '../Controllers/AuthController.js';

const router = Router();

/**
 * POST /auth/login
 * Body: { name, email, password, role }
 * Response: { success, message, user }
 */
router.post('/login', loginValidation, login);

export default router;

