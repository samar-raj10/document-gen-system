import Joi from 'joi';

/**
 * Validates login request body
 * Expects: name, email, password, role
 */
const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
    role: Joi.string()
      .valid('student', 'faculty', 'hod', 'coordinator', 'admin')
      .required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: 'Validation Error',
      success: false,
      details: error.details.map((d) => d.message),
    });
  }
  next();
};

export { loginValidation };
