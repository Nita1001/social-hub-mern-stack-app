const express = require('express');
const router = express.Router();
const {
    createItem,
    getItems,
    getItem,
    updateItem
} = require('../controllers/itemController.js');


//Create item
router.post('/', createItem);

//Get items
router.get('/:inventoryId', getItems);

//Get item
router.get('/item/:itemId', getItem);

//Update item
router.put('/update-item/:itemId', updateItem)

module.exports = router;