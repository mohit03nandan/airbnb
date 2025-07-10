const jwt = require('jsonwebtoken');
require('dotenv').config();

const { registerService, Loginservice } = require('../services/authService');

const SECRET_KEY = process.env.SECRET_KEY;

const register = async (req, res) => {
  try {
    const { name, email, password , role } = req.body;
    const existingUser = await registerService.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await registerService.register({ name, email, password , role});
    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Register Error:', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFind = await Loginservice.userfindByEmail(email);
    if (!userFind) {
      return res.status(400).json({ message: 'User not found' });
    }

    const passwordmatched = await Loginservice.userpassword(password, userFind.password);
    if (!passwordmatched) {
      return res.status(400).json({ message: 'Password not matched' });
    }

   const token = jwt.sign(
  {
    id: userFind.id,
    email: userFind.email,
    role: userFind.role
  },
  process.env.SECRET_KEY,
  { expiresIn: '1h' }
);

    return res.status(200).json({
      message: 'User login successfully',
      token,
    });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { register, Login };
