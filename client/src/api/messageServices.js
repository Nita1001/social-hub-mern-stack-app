import axios from 'axios'

export const getMessageById = async (messageId) => {
    try {
        const response = await axios.get(`/api/conversations/messages/private/${messageId}`)
        return response.data;
    } catch (error) {
        console.log('Error getting message by Id client', messageId)
    }
}