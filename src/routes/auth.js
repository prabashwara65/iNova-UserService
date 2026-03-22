const express = require('express');
const router = express.Router();
const { register, login, getMe, updateMe, logout } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);
router.put('/me', protect, updateMe);
router.get('/logout', protect, logout);

module.exports = router;
