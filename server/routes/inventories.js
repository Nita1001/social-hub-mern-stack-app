const express = require('express');
const router = express.Router();
const {
    getInv
} = require('../controllers/inventoryController.js');


//Get inventories 
router.get('/', () => { });

//Get inventory
router.get('/:id', getInv);

// Update inventory by ID
router.put('/:id', () => { })

module.exports = router;