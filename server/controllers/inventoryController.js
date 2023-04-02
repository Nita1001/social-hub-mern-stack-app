const Inventory = require('../models/inventorySchema.js');

exports.createInv = async (userId) => {
    try {
        const inventory = new Inventory(
            {
                userId: userId,
                items: []
            });
        const savedInventory = await inventory.save();
        return savedInventory;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getInv = async (req, res) => {
    try {
        const inventory = await Inventory.findById(req.params.id);
        if (!inventory) {
            return res.status(404).json(inventory);
        }
        res.status(200).json(inventory);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server Error' });
    }
}