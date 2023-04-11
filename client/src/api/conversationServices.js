import axios from 'axios';

export const getConversation = async (conversationId) => {
    try {
        const response = await axios.get(`/api/conversations/${conversationId}`);
        console.log('4 conversation GET', response);
        return response.data;
    } catch (error) {
        console.log('error', error);
    }
}

export const getUsersConversation = async (userAId, userBId) => {
    try {
        console.log('userAId, userBId', userAId, userBId);
        const response = await axios.get(`/api/conversations/${userAId}/${userBId}`);
        console.log('44 conversation GET', response);
        return response.data;
    } catch (error) {
        console.log('error', error);
        console.log("Error fetching conversation.");
    }
}

export const createNewConversation = async (currentUserId, selectedUserId) => {
    try {
        const response = await axios.post(`/api/conversations`, { userAId: currentUserId, userBId: selectedUserId });
        console.log('5 conversation POST', response);
        return response.data;
    } catch (error) {
        console.log('error', error);
    }
}