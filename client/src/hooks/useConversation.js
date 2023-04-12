import { useEffect, useReducer, useMemo } from 'react';
import { socket } from "../events/socket.js";
import conversationReducer from "../reducers/conversationReducer.js";
import { conversationActions } from '../constants/conversationActions.js';
import {
    createNewConversation,
    getUsersConversation,
    getConversation,
} from "../api/conversationServices.js";

const useConversation = (selectedUser, currentUser) => {

    console.log('selectedUser at useConversation is', selectedUser); //
    debugger

    const initialState = {
        conversations: [],
        selectedConversation: null,
        messages: [],
        inputValue: "",
        error: null,
    };
    const [state, dispatch] = useReducer(conversationReducer, initialState);

    const setConversationAndJoinRoom = (conversation) => {
        if (conversation) {
            console.log("setConversationAndJoinRoom conversation ", conversation);
            dispatch({
                type: conversationActions.SET_SELECTED_CONVERSATION,
                payload: conversation.messages,
            });

            socket.emit("join", conversation._id);
        } else {
            console.log(`conversation is probably ${conversation}, ''? `);
        }
    };

    const handleMessage = (message) => {
        console.log("handleMessage", message);
        dispatch({
            type: conversationActions.ADD_MESSAGE,
            payload: message,
        });
    };
    // Fetch conversation
    useEffect(() => {
        const fetchConversation = async () => {
            console.log('selectedUser in useConv1', selectedUser)

            if (!selectedUser._id) {
                console.log('!selectedUser._id', selectedUser); // selectedUser is {} 
                // debugger
                return
            };
            try {
                const existingConversation = await getUsersConversation(
                    currentUser,
                    selectedUser._id
                );

                if (existingConversation) {
                    setConversationAndJoinRoom(existingConversation);
                    const conversation = existingConversation;
                    console.log('Existing conversation', existingConversation)
                    const response = await getConversation(conversation._id);
                    console.log('Existing conversation | response', response)

                    if (response) {
                        dispatch({
                            type: conversationActions.SET_MESSAGES,
                            payload: response.messages,
                        });
                    }
                    console.log("useEffect getConversation res", response);
                } else {
                    const newConversation = await createNewConversation(
                        currentUser,
                        selectedUser._id
                    );
                    console.log(
                        "useEffect newConversation res",
                        newConversation
                    );
                    setConversationAndJoinRoom(newConversation);
                    dispatch({
                        type: conversationActions.SET_CONVERSATIONS,
                        payload: newConversation,
                    });
                }
            } catch (error) {
                console.log("Error fetching conversation ", error);
                dispatch({
                    type: conversationActions.SET_ERROR,
                    payload: error,
                });
            }
        };
        fetchConversation();
    }, [currentUser, selectedUser]);

    // Handle incoming message
    useEffect(() => {
        socket.on("message", handleMessage);
        return () => {
            socket.off("message", handleMessage);
            if (state.selectedConversation) {
                socket.emit("leave", state.selectedConversation._id);
            }
        };
    }, [handleMessage, state.selectedConversation, socket]);

    const sendMessage = async (message) => {
        if (!message.trim() || !state.selectedConversation) {
            return; // Do nothing if message is empty or only whitespace
        }
        // new message object
        const newMessage = {
            conversationId: state.selectedConversation._id,
            from: currentUser,
            to: selectedUser._id,
            content: message,
        };
        // Sending new message to server
        socket.emit("message", newMessage);
        // Adding the new message to messages array
        dispatch({
            type: conversationActions.ADD_MESSAGE,
            payload: newMessage,
        });
    };

    const filteredMessages = useMemo(() => {
        console.log("filteredMessages messages", state.messages); // state.messages is empty []
        // debugger

        return state.messages.filter(
            (message) =>
                (message.from === currentUser &&
                    message.to === selectedUser._id) ||
                (message.from === selectedUser._id &&
                    message.to === currentUser)
        );
    }, [selectedUser._id, state.messages, currentUser]);

    const setInputValue = (value) => {
        dispatch({
            type: conversationActions.SET_INPUT_VALUE,
            payload: value || '',
        })
    }

    return {
        messages: state.messages,
        inputValue: state.inputValue,
        selectedUser,
        sendMessage,
        setInputValue,
        filteredMessages,
    }
};

export default useConversation

