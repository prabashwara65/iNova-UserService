const express = require('express');
const router = express.Router();
const {
  register,
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserStatus,
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

// Public route for API Gateway pattern: /api/users/register
router.post('/register', register);

// Get all users (Admin only)
router.get('/', protect, authorize('admin'), getAllUsers);

// Get user by ID
router.get('/:id', protect, getUserById);

// Delete user by ID (Admin only)
router.delete('/:id', protect, authorize('admin'), deleteUserById);

// Update user status by ID (Admin only)
router.put('/:id/status', protect, authorize('admin'), updateUserStatus);

module.exports = router;
