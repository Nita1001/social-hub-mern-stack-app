import axios from 'axios';

export const getConversation = async (conversationId) => {
    try {
        const response = await axios.get(`/api/conversations/${conversationId}`);
        console.log('conversation GET', response);

        return response.data;
    } catch (error) {
        console.log('error', error);
    }
}

export const getUsersConversation = async (userAId, userBId) => {
    try {
        const response = await axios.get(`/api/conversations/${userAId}/${userBId}`);
        console.log('conversation GET', response);
        return response.data;
    } catch (error) {
        console.log('error', error);
        console.log("Error fetching conversation.");
    }
}
export const createNewConversation = async (currentUserId, selectedUserId) => {
    try {
        const response = await axios.post(`/api/conversations`, {
            users: [{ _id: currentUserId }, { _id: selectedUserId }],
        });
        console.log('conversation POST', response);

        return response.data;
    } catch (error) {
        console.log('error', error);
    }
}