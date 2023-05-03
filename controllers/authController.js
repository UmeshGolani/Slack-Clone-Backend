const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function register(req, res) {
  const { name, email, password } = req.body;
  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Hash password and create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });
    // Generate JWT and send response
    const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY);
    res.status(201).json({ message: 'User created', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Compare passwords
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Generate JWT and send response
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    res.json({ message: 'Logged in', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  register,
  login,
};
