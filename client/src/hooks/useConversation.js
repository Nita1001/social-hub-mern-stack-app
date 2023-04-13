import { useEffect, useReducer, useMemo, useContext } from 'react';
import { socket } from "../events/socket.js";
import conversationReducer from "../reducers/conversationReducer.js";
import { conversationActions } from '../constants/conversationActions.js';
import {
    createNewConversation,
    getUsersConversation,
    getConversation,
} from "../api/conversationServices.js";
import { SelectedUserContext } from '../contexts/SelectedUserContext.jsx';
import { LoginContext } from '../contexts/LoginContext.jsx';


const useConversation = () => {

    const { selectedUser } = useContext(SelectedUserContext);
    console.log('selectedUser context', selectedUser);
    // debugger
    const { userId: currentUser } = useContext(LoginContext);
    // console.log('currentUser', currentUser);
    const [conversationState, conversationDispatch] = useReducer(conversationReducer, {
        conversations: [],
        selectedConversation: null,
        messages: [],
        inputValue: "",
        error: null,
    });

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

    const handleMessage = (message) => {
        conversationDispatch({
            type: conversationActions.ADD_MESSAGE,
            payload: message
        });
    };

    const fetchConversation = async () => {
        try {
            console.log('currentUser and selectedUser Id 444', currentUser,
                selectedUser._id);
            const existingConversation = await getUsersConversation(
                currentUser,
                selectedUser._id
            );

            if (existingConversation) {
                console.log('Existing conversation', existingConversation)
                setConversationAndJoinRoom(existingConversation);
                console.log('Existing conversation ID', existingConversation._id)

                const response = await getConversation(existingConversation._id);
                console.log('Existing conversation | response', response)

                if (response) {
                    conversationDispatch({
                        type: conversationActions.SET_MESSAGES,
                        payload: response.messages,
                    });
                    console.log('response true response.messages', response.messages);
                    // debugger
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
                conversationDispatch({
                    type: conversationActions.SET_CONVERSATIONS,
                    payload: newConversation,
                });
                console.log('newConversation 444', newConversation);
            }
        } catch (error) {
            console.error(err);
            conversationDispatch({ type: conversationActions.SET_ERROR, payload: error });
        }
    };

    useEffect(() => {
        if (!selectedUser._id) {
            console.error('Selected user not found');
            return;
        }

        fetchConversation();
    }, [selectedUser._id, currentUser]);

    useEffect(() => {
        if (!socket) return;

        socket.on('message', handleMessage);

        return () => {
            socket.off('message', handleMessage);
        };
    }, [socket]);

    const sendMessage = async (message) => {
        if (!message.trim() || !conversationState.selectedConversation) {
            return; // Do nothing if message is empty or only whitespace
            debugger
        }
        // new message object
        console.log(' conversationState.selectedConversation', conversationState.selectedConversation)
        const newMessage = {
            conversationId: conversationState.selectedConversation._id,
            from: currentUser,
            to: selectedUser._id,
            content: message,
        };
        // Sending new message to server
        socket.emit("message", newMessage);
        console.log('sendMessage | newMessage', newMessage);
        // Adding the new message to messages array
        conversationDispatch({
            type: conversationActions.ADD_MESSAGE,
            payload: newMessage,
        });
    };

    const filteredMessages = useMemo(() => {
        // debugger
        if (!selectedUser._id || !conversationState.selectedConversation) {
            console.log('0000');
            return [];
        }
        console.log("filteredMessages | conversationState.selectedConversation", conversationState.selectedConversation); // messages is array of ids
        if (conversationState.selectedConversation.messages) {
            const messages = conversationState.selectedConversation.messages;
            console.log('messages are:', messages);

            return messages.filter(
                (message) =>
                    (message.from === currentUser &&
                        message.to === selectedUser._id) ||
                    (message.from === selectedUser._id &&
                        message.to === currentUser)
            );
        } else {
            console.log('conversation.messages', conversationState.messages)
            // debugger
        }
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