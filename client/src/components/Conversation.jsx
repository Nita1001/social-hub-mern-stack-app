import React, { useContext, useState, useEffect, useMemo } from "react";
import { LoginContext } from "../contexts/LoginContext.jsx";
import { socket } from "../events/socket.js";
import UsersList from "./UsersList";
import Message from "./Message";

import conversationReducer, {
    conversationActions,
} from "../reducers/conversationReducer.js";

import {
    createNewConversation,
    getUsersConversation,
    getConversation,
} from "../api/conversationServices.js";

import "./styles/conversation.style.css";
import useConversation from "../hooks/useConversation.js";

const Conversation = () => {
    const { conversation, messages, error, dispatch } = useConversation;

    const { userId: currentUser, userData } = useContext(LoginContext);

    const [selectedUser, setSelectedUser] = useState({});

    // const [state, dispatch] = useReducer(conversationReducer, initialState); before

    const setConversationAndJoinRoom = (conversation) => {
        console.log("setConversationAndJoinRoom 1 ", conversation);
        if (conversation) {
            console.log("setConversationAndJoinRoom 2 ", conversation);
            // setConversation(conversation); before
            const { selectedConversation: conversation } = state;
            const setConversation = (conversation) =>
                dispatch({
                    type: conversationActions.SET_SELECTED_CONVERSATION,
                    payload: conversation.messages,
                });
            // setMessages(conversation.messages); before

            socket.emit("join", conversation._id);
        } else {
            console.log(`conversation is probably ${conversation}, ''? `);
        }
    };

    const handleMessage = (message) => {
        console.log("handleMessage", message);

        const message = state;
        const setMessages = (prevMessages) => {
            dispatch({
                type: conversationActions.SET_MESSAGE,
                payload: [...prevMessages, message],
            });
        };
        return setMessages;
        // setMessages((prevMessages) => {
        //     console.log("31231", typeof prevMessages);
        //     return [...prevMessages, message];
        // });
        // before
    };

    useEffect(() => {
        const fetchConversation = async () => {
            if (!selectedUser._id) return;

            try {
                const existingConversation = await getUsersConversation(
                    currentUser,
                    selectedUser._id
                );

                if (existingConversation) {
                    setConversationAndJoinRoom(existingConversation);
                    const conversation = existingConversation;

                    const response = await getConversation(conversation._id);
                    if (response) {
                        const setMessages = handleMessage(); // try
                        setMessages(response.messages);
                        // setMessages(response.messages); before
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
                }
            } catch (error) {
                console.log("Error fetching conversation ", error);
            }
        };

        fetchConversation();

        socket.on("message", handleMessage);

        return () => {
            socket.off("message", handleMessage);
            if (conversation) {
                socket.emit("leave", conversation._id);
            }
        };
    }, [currentUser, selectedUser]);

    const sendMessage = async (message) => {
        if (!message.trim() || !conversation) {
            return; // Do nothing if message is empty or contains only whitespace
        }

        // Create a new message object
        const newMessage = {
            conversationId: conversation._id,
            from: currentUser,
            to: selectedUser._id,
            content: message,
        };

        // Send the message to the server
        socket.emit("message", newMessage);

        // Add the new message to the messages array
        setMessages((prevMessages) => {
            console.log("31231", typeof prevMessages);
            console.log("31231 messages", messages);

            return [...prevMessages, ...newMessage];
        });
    };

    const handleUserSelected = (user) => {
        // set selected user and load their conversation
        setSelectedUser(user);
    };

    const filteredMessages = useMemo(() => {
        console.log("MMM", messages);
        return messages
            ? messages.filter(
                  (message) =>
                      (message.from === currentUser &&
                          message.to === selectedUser._id) ||
                      (message.from === selectedUser._id &&
                          message.to === currentUser)
              )
            : [];
    }, [selectedUser._id, messages]);

    return (
        <div className="conversation-container">
            <UsersList handleUserSelected={handleUserSelected} />
            <div className="conversation-box">
                {selectedUser && (
                    <>
                        {/* TODO: replace with icon/image of the users */}
                        <h2>
                            {userData.username} In Conversation with {""}
                            {selectedUser.username}
                        </h2>
                        {messages &&
                            filteredMessages.map((message) => (
                                <Message
                                    key={message.id}
                                    message={message}
                                    sentByCurrUser={
                                        message?.from === currentUser
                                    }
                                />
                            ))}
                    </>
                )}
            </div>
            {selectedUser && (
                <div className="conversation-input">
                    <input
                        type="text"
                        placeholder="Whats on your mind?"
                        onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue}
                    />
                    <button
                        onClick={() => sendMessage(inputValue)}
                        disabled={!selectedUser._id}
                    >
                        Send
                    </button>
                </div>
            )}
        </div>
    );
};

export default Conversation;
