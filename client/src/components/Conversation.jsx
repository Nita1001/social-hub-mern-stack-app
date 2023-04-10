import React, { useContext, useState, useEffect } from "react";
import Message from "./Message.jsx";
import { messages } from "./messages.js";

// import socket from "../events/socket.js";

import "./styles/conversation.style.css";
const Conversation = () => {
    const currentUser = "User A";

    return (
        <div className="conversation-container">
            <div className="conversation-box">
                {messages.map((message) => (
                    <Message
                        key={message.id}
                        message={message}
                        sentByCurrUser={message.sender === currentUser}
                    />
                ))}
            </div>
            <div className="conversation-input">
                <input type="text" placeholder="Whats on your mind?" />
                <button onClick={() => sendMessage(inputValue)}>Send</button>
            </div>
        </div>
    );
};

export default Conversation;
