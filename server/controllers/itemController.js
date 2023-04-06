const Item = require('../models/itemSchema.js');
const Inventory = require('../models/inventorySchema.js');
const getInventoryIdFromUserId = require('../helpers/getInventoryIdFromUserId.js');
const updateInventory = require('../helpers/updateInventory.js');

exports.createItem = async (req, res) => {
    try {
        const { userId, title, description, category, image, status } = req.body;
        const inventoryId = await getInventoryIdFromUserId(userId);

        const item = new Item({
            owner: userId,
            inventory: inventoryId,
            title,
            description,
            category,
            image,
            status
        })
        const savedItem = await item.save();
        const updatedInventory = await updateInventory(inventoryId, { $push: { items: savedItem._id } });

        res.json({
            message: 'Item created successfully',
            item: savedItem,
            Inventory: updatedInventory
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

exports.getItems = async (req, res) => {
    try {
        const inventoryId = req.params.inventoryId;
        const inventory = await Inventory.findById(inventoryId);
        const items = inventory.items;
        res.json({ items: items });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

exports.getItem = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const item = await Item.findById(itemId);
        console.log(item)
        res.json({ item: item });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}