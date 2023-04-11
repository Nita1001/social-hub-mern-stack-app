import { useEffect, useReducer } from 'react';
import conversationActions from '../constants/conversationActions.js';

const useConversation = () => {
    const initialState = {
        conversations: [],
        selectedConversation: "", // null ?
        messages: [],
        inputValue: "",
        error: null,
    };

    const [state, dispatch] = useReducer(conversationsReducer, initialState);

    // useEffect payload
    useEffect(() => {
        try {
            dispatch({
                type: conversationActions.SET_CONVERSATION,
                payload: state.conversations
            })
            dispatch({
                type: conversationActions.SET_MESSAGES,
                payload: state.messages
            })
        } catch (error) {
            dispatch({
                type: conversationActions.SET_ERROR,
                payload: state.error
            })
        }
    }, []);


    return {
        conversations: state.conversations,
        messages: state.messages,
        error: state.error,
        dispatch
    }
}

export default useConversation
