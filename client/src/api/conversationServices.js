import axios from 'axios';

export const getConversation = async (conversationId) => {
    try {
        const response = await axios.get(`/api/conversations/users/${conversationId}`);
        return response.data;
    } catch (error) {
        console.log('error', error);
    }
}

export const getUsersConversation = async (userAId, userBId) => {
    try {
        const response = await axios.get(`/api/conversations/${userAId}/${userBId}`);
        return response.data;
    } catch (error) {
        console.log('error', error);
        console.log("Error fetching conversation.");
    }
}

export const createNewConversation = async (currentUserId, selectedUserId) => {
    try {
        const response = await axios.post(`/api/conversations`, { userAId: currentUserId, userBId: selectedUserId });
        return response.data;
    } catch (error) {
        console.log('error', error);
    }
}