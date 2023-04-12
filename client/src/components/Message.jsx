import React from "react";
import "./styles/conversation.style.css";

const Message = ({ message, sentByCurrUser }) => {
    const messageClassName = sentByCurrUser
        ? "message sent"
        : "message received";

    return (
        <div className={messageClassName}>
            <div className="message-content">
                <div className="text">{message.content}</div>
            </div>
        </div>
    );
};

export default Message;
