const express = require('express');
const router = express.Router();
const {
    createMessage,
    getMessages
} = require('../controllers/messageController.js');


//Create message
router.post('/', createMessage);

//Get messages
router.get('/:userId', getMessages);

module.exports = router;