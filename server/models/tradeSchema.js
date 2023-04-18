const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
    requestedItems: [{
        itemId: { type: String, required: true },
    }],
    offeredItems: [{
        itemId: { type: String, required: true },
    }],
    status: { type: String, default: 'pending' },
    userA: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userB: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Trade', tradeSchema);