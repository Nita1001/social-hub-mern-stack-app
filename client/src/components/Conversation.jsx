import React, { useContext, useState, useEffect, useMemo } from "react";
import Message from "./Message";
import { LoginContext } from "../contexts/LoginContext.jsx";
import { socket } from "../events/socket.js"; // import socket object
import UsersList from "./UsersList";
import "./styles/conversation.style.css";
import {
    createNewConversation,
    getUsersConversation,
    getConversation,
} from "../api/conversationServices.js";

const Conversation = () => {
    const { userId: currentUser, userData } = useContext(LoginContext);
    const [selectedUser, setSelectedUser] = useState({});
    const [conversation, setConversation] = useState({});
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const setConversationAndJoinRoom = (conversation) => {
        console.log("22 11 22 conversation", conversation);
        if (conversation) {
            console.log("22 11 33 conversation", conversation);
            setConversation(conversation);
            socket.emit("2 join", conversation._id);
            setMessages(conversation.messages);
        } else {
        }
    };

    const handleMessage = (messages) => {
        if (messages.conversationId === conversation._id) {
            setMessages((prevMessages) => [...prevMessages, messages]);
        }
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
                    if (response) setMessages(response.messages);
                    console.log("COW COW COW", response);
                } else {
                    const newConversation = await createNewConversation(
                        currentUser,
                        selectedUser._id
                    );
                    console.log("000 newConversation", newConversation);

                    setConversationAndJoinRoom(newConversation);
                }
            } catch (error) {
                console.log("Error fetching conversation: ", error);
            }
        };

        fetchConversation();

        socket.on("message", handleMessage);

        return () => {
            if (conversation) {
                socket.emit("leave", conversation._id);
            }
        };
    }, [currentUser, selectedUser]);

    const sendMessage = async (message) => {
        if (!message.trim()) {
            return; // Do nothing if message is empty or contains only whitespace
        }
        console.log("5 selected user ID", selectedUser._id);
        console.log("5 message is:", message);

        // Create a new message object
        const newMessage = {
            conversationId: conversation._id,
            from: currentUser,
            to: selectedUser._id,
            content: message,
        };
        console.log("5 new message is:", newMessage);

        // Send the message to the server
        socket.emit("message", newMessage);
        // update messages state
        setMessages([...messages, message]);
        // Add the new message to the messages array
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    const handleUserSelected = (user) => {
        // set selected user and load their conversation
        setSelectedUser(user);
    };

    const filteredMessages = useMemo(() => {
        return messages
            ? messages.filter(
                  (message) =>
                      (message.sender === currentUser &&
                          message.receiver === selectedUser._id) ||
                      (message.sender === selectedUser._id &&
                          message.receiver === currentUser)
              )
            : [];
    }, [currentUser, selectedUser, messages, conversation]);

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
                        {filteredMessages.map((message) => (
                            <Message
                                key={message.id}
                                message={message}
                                sentByCurrUser={message.sender === currentUser}
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
