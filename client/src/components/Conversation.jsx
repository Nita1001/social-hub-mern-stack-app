import React, { useCallback, useContext, useEffect, useRef } from "react";
import { SelectedUserContext } from "../contexts/SelectedUserContext";
import useConversation from "../hooks/useConversation.js";
import UsersList from "./UsersList.jsx";
import ConversationBox from "./ConversationBox.jsx";

import "./styles/conversation.style.css";
const Conversation = () => {
    const { inputValue, setInputValue, sendMessage } = useConversation();
    const { selectedUser } = useContext(SelectedUserContext);

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
            {selectedUser ? <ConversationBox /> : <div>Select a user</div>}
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
