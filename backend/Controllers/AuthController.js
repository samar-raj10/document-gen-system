import UserModel from '../Models/User.js';
import bcrypt from 'bcrypt';

/**
 * Role-Based Login Controller
 * Authenticates user by verifying:
 * - Name
 * - Email
 * - Password
 * - Role
 */
const login = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Step 1: Find user by email and role (ensure role matches)
    const user = await UserModel.findOne({ email, role });

    if (!user) {
      return res.status(401).json({
        message: 'Authentication failed. Invalid email, role, or user does not exist.',
        success: false,
      });
    }

    // Step 2: Verify name matches
    if (user.name !== name) {
      return res.status(401).json({
        message: 'Authentication failed. Name does not match.',
        success: false,
      });
    }

    // Step 3: Verify password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Authentication failed. Password is incorrect.',
        success: false,
      });
    }

    // Step 4: All checks passed - return success
    return res.status(200).json({
      message: 'Login successful',
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      message: 'Internal server error',
      success: false,
      error: error.message,
    });
  }
};

export { login };
