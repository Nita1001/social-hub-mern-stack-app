const Trade = require('../models/tradeSchema.js');

exports.createTrade = async (req, res) => {
    try {
        const { requestedItems, offeredItems, senderId, recipientId } = req.body;

        const trade = new Trade({
            requestedItems,
            offeredItems,
            userA: senderId,
            userB: recipientId,
        });
        const savedTrade = await trade.save();
        res.status(201).json(savedTrade);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

exports.getAllTradesOfUserById = async (req, res) => {
    try {
        const trades = await Trade.find({ $or: [{ userA: req.user._id }, { userB: req.user._id }] });
        res.send(trades);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

exports.updateTrade = async (req, res) => {
    try {
        const trade = await Trade.findOne({
            _id: req.params.tradeId,
            $or: [{ userA: req.user._id }, { userB: req.user._id }],
        });
        if (!trade) {
            return res.status(404).json({ message: 'Trade not found' });
        }

        if (trade.status !== 'pending') {
            return res
                .status(400)
                .json({ message: 'Cannot update trade that is not pending' });
        }

        const { requestedItems, offeredItems } = req.body;
        trade.requestedItems = requestedItems;
        trade.offeredItems = offeredItems;
        trade.updatedAt = new Date();
        const updatedTrade = await trade.save();
        res.status(200).json(updatedTrade);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

exports.deleteTradeById = async (req, res) => {
    try {
        const trade = await Trade.findById(req.params.id);
        if (!trade) {
            return res.status(404).send('Trade not found');
        }
        if (trade.userA.toString() !== req.user._id && trade.userB.toString() !== req.user._id) {
            return res.status(401).send('Unauthorized');
        }
        await trade.remove();
        res.send('Trade deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}