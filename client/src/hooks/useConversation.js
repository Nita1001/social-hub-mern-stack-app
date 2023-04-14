import { useEffect, useReducer, useMemo, useContext, useCallback } from 'react';
import { socket } from "../events/socket.js";
import { LoginContext } from '../contexts/LoginContext.jsx';
import { SelectedUserContext } from '../contexts/SelectedUserContext.jsx';

import conversationReducer from "../reducers/conversationReducer.js";
import { conversationActions } from '../constants/conversationActions.js';
import {
    createNewConversation,
    getUsersConversation,
    getConversation,
} from "../api/conversationServices.js";
import { getMessageById } from '../api/messageServices.js';


const useConversation = () => {

    const { selectedUser } = useContext(SelectedUserContext);
    const { userId: currentUser } = useContext(LoginContext);
    const [conversationState, conversationDispatch] = useReducer(conversationReducer, {
        conversations: [],
        selectedConversation: null,
        messages: [],
        error: null,
    });

    const {
        conversations,
        selectedConversation,
        messages,
        error,
    } = conversationState;

    const setConversationAndJoinRoom = useCallback((conversation) => {
        if (conversation) {
            conversationDispatch({
                type: conversationActions.SET_SELECTED_CONVERSATION,
                payload: conversation
            });
            socket.emit('joinRoom', conversation._id);
        } else {
            conversationDispatch({ type: conversationActions.SET_ERROR, payload: 'error' });
        }
    }, []);

    const getAllMessagesByIds = useCallback(async (messageIds) => {
        const promises = messageIds.map((messageId) => getMessageById(messageId));
        const allMessages = await Promise.all(promises);
        return allMessages.filter((message) => message !== null);
    }, []);

    const handleMessage = useCallback((message) => {
        if (!message) return;
        conversationDispatch({
            type: conversationActions.ADD_MESSAGE,
            payload: message
        });
        console.log('handleMessage | message', message);
        return message;
    }, []);

    const fetchConversation = async () => {
        try {
            const existingConversation = await getUsersConversation(
                currentUser,
                selectedUser._id
            );

            if (existingConversation) {
                setConversationAndJoinRoom(existingConversation);
                console.log('Existing conversation ID', existingConversation._id)

                const response = await getConversation(existingConversation._id);

                if (response) {
                    const messages = response.messages;
                    const allMessages = await getAllMessagesByIds(messages);
                    console.log('All messages', allMessages);
                    // debugger;

                    conversationDispatch({
                        type: conversationActions.SET_MESSAGES,
                        payload: allMessages,
                    });
                    // Set up socket event listener for new messages
                    socket.off('message', handleMessage); // remove existing event listener
                    socket.on('message', handleMessage); // add new event listener
                    // debugger
                }
                // console.log("useEffect getConversation res", response);
            } else {
                const newConversation = await createNewConversation(
                    currentUser,
                    selectedUser._id
                );
                console.log("useEffect | newConversation res", newConversation);
                setConversationAndJoinRoom(newConversation);
                conversationDispatch({
                    type: conversationActions.SET_CONVERSATIONS,
                    payload: newConversation,
                });
                console.log('newConversation', newConversation);
                // Set up socket event listener for new messages
                socket.off('message', handleMessage); // remove existing event listener
                socket.on('message', handleMessage); // add new event listener
            }
        } catch (error) {
            console.error(error);
            conversationDispatch({ type: conversationActions.SET_ERROR, payload: error });
        }
    };


    useEffect(() => {
        if (!selectedUser._id) return;
        fetchConversation();
    }, [selectedUser._id, currentUser]);

    const sendMessage = async (message) => {
        if (!message.trim() || !selectedConversation) {
            return; // Do nothing if message is empty or only whitespace
        }
        // new message object
        console.log(' conversationState.selectedConversation', selectedConversation)
        const newMessage = {
            message: {
                conversationId: selectedConversation._id,
                from: currentUser,
                to: selectedUser._id,
                content: message,
            }
        };
        // Sending new message to server
        socket.emit("message", newMessage.message);
        console.log('sendMessage | newMessage', newMessage);

        // Adding the new message to messages array
        conversationDispatch({
            type: conversationActions.ADD_MESSAGE,
            payload: newMessage,
        });
    };

    const filteredMessages = useMemo(() => {
        if (!selectedUser._id || !selectedConversation) {
            return [];
        }
        console.log('filteredMessages | conversationState.messages', messages);
        return messages || [];
    }, [selectedUser._id, selectedConversation, messages]);

    return {
        conversations,
        selectedConversation,
        messages,
        error,
        currentUser,
        filteredMessages,
        setConversationAndJoinRoom,
        sendMessage,
    }
};

export default useConversation