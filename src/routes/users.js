const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

// Get all users (Admin only)
router.get('/', authorize('admin'), getAllUsers);

// Get user by ID
router.get('/:id', getUserById);

module.exports = router;
