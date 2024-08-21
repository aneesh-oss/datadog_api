const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET; // Load from environment variable

// User registration
exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();
  res.status(201).send('User Registered');
};

// User login
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && await bcrypt.compare(password, user.password)) {
    // Create a JWT token
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour
    });
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
};
