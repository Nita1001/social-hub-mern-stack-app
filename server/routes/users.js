const express = require('express');
const router = express.Router();
const { createUser, getUsers, getUser, updateUser, deleteUser } = require('../controllers/userController.js');

// Create user
router.post('/', createUser);

// Get users
router.get('/', getUsers);

// Get user by ID
router.get('/:id', getUser);

// Update user by ID
router.put('/:id', updateUser)

// Delete user by ID
router.delete('/:id', deleteUser);

module.exports = router;