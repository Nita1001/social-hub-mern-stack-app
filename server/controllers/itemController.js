const Inventory = require('../models/inventorySchema.js');
const getInventoryIdFromUserId = require('../helpers/getInventoryIdFromUserId.js');

exports.createItem = async (req, res) => {
    try {
        const { userId, title, description, category, image, status } = req.body;
        console.log('req.body', req.body);
        const inventoryId = await getInventoryIdFromUserId(userId);
        console.log('111', inventoryId);

        res.json({
            message: 'Item created successfully',
            owner: userId
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}