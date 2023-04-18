const express = require('express');
const router = express.Router();

const { deleteTradeById, updateTrade, getAllTradesOfUserById, createTrade } = require('../controllers/tradeController');

// Create a new trade
router.post('/', createTrade);

// Get all trades for a user
router.get('/users/:userId', getAllTradesOfUserById);

// Update a trade
router.patch('/update/:id', updateTrade);

// Delete a trade
router.delete('/delete/:id', deleteTradeById);

module.exports = router;