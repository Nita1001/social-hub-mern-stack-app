const express = require('express');
const router = express.Router();
const { createUser, getUsers, getUser, updateUser, deleteUser, login } = require('../controllers/userController.js');

// Create user
router.post('/', createUser);

// Login user
router.post('/login', login);

// Get users
router.get('/', getUsers);

// Get user by ID
router.get('/:id', getUser);

// Update user by ID
router.put('/:id', updateUser)

// Delete user by ID
router.delete('/:id', deleteUser);



module.exports = router;