const Item = require('../models/itemSchema.js');

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