import axios from 'axios';

export const createTrade = async (requestedItems, offeredItems, senderId, recipientId) => {
    try {
        const response = await axios.post('/api/trades', {
            requestedItems,
            offeredItems,
            senderId,
            recipientId,
        });
        console.log('Trade created:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating trade:', error);
        throw error;
    }
}

// get all trades of userId
export const getAllTradesOfUserById = async (userId) => {
    try {
        const response = await axios.get(`/api/trades/users/${userId}`);
        const trades = response.data;
        console.log(trades); // Do something with trades
    } catch (error) {
        console.error(error);
    }
};

// Update a trade
export const updateTrade = async (tradeId, requestedItems, offeredItems) => {
    try {
        const response = await axios.put(`/api/trades/update/${tradeId}`, {
            requestedItems,
            offeredItems,
        });
        const updatedTrade = response.data;
        console.log(updatedTrade); // Do something with updatedTrade
    } catch (error) {
        console.error(error);
    }
};

// Delete a trade by ID
export const deleteTrade = async (tradeId) => {
    try {
        const response = await axios.delete(`/api/trades/delete/${tradeId}`);
        const message = response.data;
        console.log(message); // Do something with message
    } catch (error) {
        console.error(error);
    }
};