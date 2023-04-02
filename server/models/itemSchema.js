const mongoose = require('mongoose');

const item = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    inventory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inventory'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    category: {
        type: String,
        required: true,
        enum: ['shonen', 'shojo', 'seinen']
    },
    image: {
        type: String,
    },
    status: {
        type: String,
        enum: ['available', 'trading', 'show off']
    }
})
module.exports = mongoose.model('Item', item);
