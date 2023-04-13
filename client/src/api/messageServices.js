import axios from 'axios'

export const getMessageById = async (messageId) => {
    try {
        const response = await axios.get(`/api/conversations/messages/private/${messageId}`)
        console.log('getMessageById client | response', response);
        return response.data;
    } catch (error) {
        console.log('Error getting message by Id client', messageId)
    }
}