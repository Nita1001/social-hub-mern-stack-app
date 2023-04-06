const express = require('express');
const router = express.Router();
const {
    createItem,
    getItems,
    getItem
} = require('../controllers/itemController.js');


//Create item
router.post('/', createItem);

//Get items
router.get('/:inventoryId', getItems);

//Get item
router.get('/item/:itemId', getItem);

module.exports = router;