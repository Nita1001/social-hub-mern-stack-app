const express = require('express');
const router = express.Router();
const {
    createItem
} = require('../controllers/itemController.js');


//Create item
router.post('/', createItem);

//Get items
router.get('/', () => { });

//Get item
router.get('/:id', () => { });

module.exports = router;