import React, { useCallback, useContext, useEffect } from "react";
import UsersList from "./UsersList";
import Message from "./Message";
import useConversation from "../hooks/useConversation.js";
import "./styles/conversation.style.css";
import { SelectedUserContext } from "../contexts/SelectedUserContext";
import { LoginContext } from "../contexts/LoginContext";

const Conversation = () => {
    const {
        messages,
        inputValue,
        setInputValue,
        sendMessage,
        filteredMessages,
        currentUser,
    } = useConversation();

    const { userData: currentUserData } = useContext(LoginContext);

    const { selectedUser } = useContext(SelectedUserContext);

    useEffect(() => {
        console.log("THIS selectedUser!", selectedUser, currentUserData);

        // debugger;
    }, [selectedUser.username]);

    const handleInputChange = useCallback(
        (event) => {
            setInputValue(event.target.value);
        },
        [setInputValue]
    );

    const handleSendMessage = useCallback(() => {
        sendMessage(inputValue);
    }, [sendMessage, inputValue]);

    return (
        <div className="conversation-container">
            <UsersList />
            {selectedUser ? (
                <div className="conversation-box">
                    {/* TODO: replace with icon/image of the users */}
                    <h6>
                        {currentUserData.username} In Conversation with{" "}
                        {selectedUser.username}
                    </h6>
                    {messages &&
                        filteredMessages &&
                        filteredMessages.map((message, index) => (
                            <Message
                                key={index}
                                message={message}
                                sentByCurrUser={message?.from === currentUser}
                            />
                        ))}
                </div>
            ) : (
                <div>Select a user</div>
            )}
            {selectedUser ? (
                <div className="conversation-input">
                    <input
                        type="text"
                        placeholder="Whats on your mind?"
                        onChange={handleInputChange}
                        value={inputValue}
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            ) : null}
        </div>
    );
};

export default Conversation;
