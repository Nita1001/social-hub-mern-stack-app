import { conversationActions } from "../constants/conversationActions";

const conversationReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_CONVERSATIONS:
            return {
                ...state,
                conversations: [payload]
            };
        case SET_SELECTED_CONVERSATION:
            return {
                ...state,
                selectedConversation: payload
            };
        case SET_MESSAGES:
            return {
                ...state,
                messages: payload
            };
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, payload]
            };
        case SET_INPUT_VALUE:
            return {
                ...state,
                inputValue: payload
            };
        case SET_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;
    }
};

export default conversationReducer;