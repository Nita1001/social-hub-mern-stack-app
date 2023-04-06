
const Inventory = require('../models/inventorySchema.js');

const updateInventory = async (inventoryId, update) => {
    try {
        const updatedInventory = await Inventory.findByIdAndUpdate(inventoryId, update, { new: true });
        return updatedInventory;
    } catch (error) {
        console.error('Error updating user after creating item');
        throw new Error(error.message);
    }
}

module.exports = updateInventory;