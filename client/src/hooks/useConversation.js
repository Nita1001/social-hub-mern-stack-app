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
        inputValue: "",
        error: null,
    });

    // const {
    //     conversations,
    //     selectedConversation,
    //     messages,
    //     inputValue,
    //     error,
    //   } = conversationState;

    const setConversationAndJoinRoom = (conversation) => {
        if (conversation) {
            conversationDispatch({
                type: conversationActions.SET_SELECTED_CONVERSATION,
                payload: conversation
            });
            socket.emit('joinRoom', conversation._id);
        } else {
            conversationDispatch({ type: conversationActions.SET_ERROR, payload: 'error' });
        }
    };
    const getAllMessagesByIds = async (messageIds) => {
        const messages = [];
        for (const messageId of messageIds) {
            try {
                const response = await getMessageById(messageId);
                messages.push(response);
            } catch (error) {
                console.log(`Error getting message with ID ${messageId}: ${error}`);
            }
        }
        return messages;
    };

    const handleMessage = useCallback((message) => {
        conversationDispatch({
            type: conversationActions.ADD_MESSAGE,
            payload: message
        });
        console.log('handleMessage | message', message);
    }, []);

    useEffect(() => {
        if (!selectedUser._id) return;

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
                        // debugger
                        // Set up socket event listener for new messages
                        socket.off('message', handleMessage); // remove existing event listener
                        socket.on('message', handleMessage); // add new event listener
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
        fetchConversation();
    }, [selectedUser._id, currentUser]);

    const sendMessage = async (message) => {
        if (!message.trim() || !conversationState.selectedConversation) {
            return; // Do nothing if message is empty or only whitespace
        }
        // new message object
        console.log(' conversationState.selectedConversation', conversationState.selectedConversation)
        const newMessage = {
            message: {
                conversationId: conversationState.selectedConversation._id,
                from: currentUser,
                to: selectedUser._id,
                content: message,
            }
        };
        // Adding the new message to messages array
        conversationDispatch({
            type: conversationActions.ADD_MESSAGE,
            payload: newMessage,
        });
        // Sending new message to server
        socket.emit("message", newMessage.message);
        console.log('sendMessage | newMessage', newMessage);
        // debugger
    };

    const filteredMessages = useMemo(() => {
        if (!selectedUser._id || !conversationState.selectedConversation) {
            return [];
        }
        console.log('filteredMessages | conversationState.messages', conversationState.messages);
        return conversationState.messages || [];
    }, [selectedUser._id, conversationState.selectedConversation, conversationState.messages]);

    const setInputValue = (value) => {
        conversationDispatch({
            type: conversationActions.SET_INPUT_VALUE,
            payload: value || '',
        })
    }

    return {
        conversations: conversationState.conversations,
        selectedConversation: conversationState.selectedConversation,
        messages: conversationState.messages,
        inputValue: conversationState.inputValue,
        error: conversationState.error,
        currentUser,
        filteredMessages,
        setConversationAndJoinRoom,
        sendMessage,
        setInputValue
    }
};

export default useConversation