import React from "react";
import "./styles/conversation.style.css";

const Message = ({ message, sentByCurrUser, currentUser }) => {
    const messageClassName = sentByCurrUser
        ? "message sent"
        : "message received";
    // final check
    console.log(
        "message received in Messages",
        message,
        currentUser,
        sentByCurrUser
    );
    return (
        <div className={messageClassName}>
            <div className="message-content">
                <div className="text">{message.content}</div>
            </div>
        </div>
    );
};

export default Message;
