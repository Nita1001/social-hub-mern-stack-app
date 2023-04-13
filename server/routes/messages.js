const express = require('express');
const router = express.Router();
const {
    createMessage,
    getMessages,
    getMessageById
} = require('../controllers/messageController.js');


//Create message
router.post('/', createMessage);

//Get messages
router.get('/:userId', getMessages);
//Get message By MessageId
router.get('/private/:messageId', getMessageById)

module.exports = router;