import { conversationActions } from "../constants/conversationActions";

const conversationReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case conversationActions.SET_CONVERSATIONS:
            return {
                ...state,
                conversations: [payload],
                // selectedConversation: payload
            };
        case conversationActions.SET_SELECTED_CONVERSATION:
            return {
                ...state,
                selectedConversation: payload
            };
        case conversationActions.SET_MESSAGES:
            return {
                ...state,
                messages: payload
            };
        case conversationActions.ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, payload]
            };
        case conversationActions.SET_INPUT_VALUE:
            return {
                ...state,
                inputValue: payload
            };
        case conversationActions.SET_ERROR:
            return {
                ...state,
                error: payload,
            }
        default:
            return state;
    }
};

export default conversationReducer;