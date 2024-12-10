// src/controllers/authController.js

const { createUser, findUserByEmail } = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET
const NODE_ENV = process.env.NODE_ENV

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await createUser(email, password);
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

  const token = jwt.sign({ userId: user.id },JWT_SECRET, { expiresIn: '1h' });
    res.cookie('auth_token', token, {
      httpOnly: true,                      // The cookie is inaccessible to JavaScript
      secure:  NODE_ENV === 'production', // Only set cookies over HTTPS in production
      sameSite: 'lax',                   // 'Strict' for better security (adjust as needed)
      domain: 'localhost',              // Set the domain for local development or use your production domain
      maxAge: 24 * 60 * 60 * 1000,     // 1 day  expiration time for the cookie
    });
    // res.redirect('http://localhost:3002'); 
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


const logout = (req, res) => {
  // Clear the auth_token cookie
  res.clearCookie('auth_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    domain: 'localhost', // Ensure it matches the domain used when setting the cookie
  });

  res.status(200).json({ message: 'Logout successful' });
};


module.exports = { register, login, logout };
