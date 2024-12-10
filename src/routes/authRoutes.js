// src/routes/authRoutes.js
const express = require('express');
const { register, login, logout } = require('../controllers/authController'); // Ensure correct path
const {authenticateToken} = require('../middleware/authMiddleware')

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify-token', authenticateToken)
router.post('/logout', logout)

module.exports = router;
