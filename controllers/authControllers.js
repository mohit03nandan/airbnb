const { registerService } = require('../services/authService');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await registerService.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Register user
    const user = await registerService.register({ name, email, password });

    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    });
  } catch (error) {
    console.error('Register Error:', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};



module.exports = { register };
