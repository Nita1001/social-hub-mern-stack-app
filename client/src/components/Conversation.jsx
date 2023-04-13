import React, { useCallback, useContext, useEffect, useRef } from "react";
import { SelectedUserContext } from "../contexts/SelectedUserContext";
import { LoginContext } from "../contexts/LoginContext";
import useConversation from "../hooks/useConversation.js";
import UsersList from "./UsersList";
import Message from "./Message";

import "./styles/conversation.style.css";
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
    const conversationBoxRef = useRef(null);
    const scrollToBottom = () => {
        if (conversationBoxRef.current) {
            conversationBoxRef.current.scrollTop =
                conversationBoxRef.current.scrollHeight;
        }
    };
    useEffect(() => {
        scrollToBottom();
    }, [filteredMessages]);

    const handleInputChange = useCallback(
        (event) => {
            setInputValue(event.target.value);
        },
        [setInputValue]
    );
    const handleSendMessage = useCallback(() => {
        sendMessage(inputValue);
        setInputValue("");
    }, [sendMessage, inputValue, setInputValue]);

    return (
        <div className="conversation-container">
            <UsersList />
            {selectedUser ? (
                <div className="conversation-box" ref={conversationBoxRef}>
                    {/* TODO: replace with icon/image of the users */}
                    <h6>
                        {currentUserData.username} In Conversation with{" "}
                        {selectedUser.username}
                    </h6>
                    {filteredMessages &&
                        filteredMessages.map(
                            (message, index) =>
                                // message.message !! I should change to message
                                message.message.from && (
                                    <Message
                                        key={message.message._id}
                                        message={message.message}
                                        sentByCurrUser={
                                            message.message.from === currentUser
                                        }
                                    />
                                )
                        )}
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
