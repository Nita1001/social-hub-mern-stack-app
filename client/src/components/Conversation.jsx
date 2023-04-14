import React, { useCallback, useContext } from "react";

import useConversation from "../hooks/useConversation.js";
import ConversationBox from "./ConversationBox.jsx";
import { SelectedUserContext } from "../contexts/SelectedUserContext.jsx";
import useInput from "../hooks/useMessageInput.js";
import "./styles/conversation.style.css";

const Conversation = () => {
    const { sendMessage, filteredMessages, currentUser } = useConversation();
    const { selectedUser } = useContext(SelectedUserContext);
    const [inputValue, handleInputChange, resetInput] = useInput("");

    const handleSendMessage = useCallback(() => {
        sendMessage(inputValue);
        resetInput();
    }, [sendMessage, inputValue, resetInput]);

    return (
        <div className="conversation-container">
            {selectedUser ? (
                <ConversationBox
                    filteredMessages={filteredMessages}
                    currentUser={currentUser}
                />
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
