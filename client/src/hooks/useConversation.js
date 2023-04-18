import { useEffect, useReducer, useMemo, useContext, useCallback } from 'react';
import { LoginContext } from '../contexts/LoginContext.jsx';
import { SelectedUserContext } from '../contexts/SelectedUserContext.jsx';
import { useSocket } from '../events/socket.js';

import conversationReducer from "../reducers/conversationReducer.js";
import { conversationActions } from '../constants/conversationActions.js';
import {
    createNewConversation,
    getUsersConversation,
    getConversation,
} from "../api/conversationServices.js";
import { getMessageById } from '../api/messageServices.js';

const useConversation = () => {
    const socket = useSocket();
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
                const response = await getConversation(existingConversation._id);

                if (response) {
                    const messages = response.messages;
                    const allMessages = await getAllMessagesByIds(messages);

                    conversationDispatch({
                        type: conversationActions.SET_MESSAGES,
                        payload: allMessages,
                    });
                    // Set up socket event listener for new messages
                    socket.off('message', handleMessage); // remove existing event listener
                    socket.on('message', handleMessage); // add new event listener
                }
            } else {
                const newConversation = await createNewConversation(
                    currentUser,
                    selectedUser._id
                );
                setConversationAndJoinRoom(newConversation);
                conversationDispatch({
                    type: conversationActions.SET_CONVERSATIONS,
                    payload: newConversation,
                });
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
        const newMessage = {
            message: {
                conversationId: selectedConversation._id,
                from: currentUser,
                to: selectedUser._id,
                content: message,
                updatedAt: new Date().toISOString()
            }
        };
        // Sending new message to server
        socket.emit("message", newMessage.message);

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