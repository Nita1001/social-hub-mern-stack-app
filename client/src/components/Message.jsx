import React, { useContext } from "react";
import { dateFormatter } from "../utils/dateFormatter.js";
import "./styles/conversation.style.css";
import { DarkModeContext } from "../contexts/DarkModeContext.jsx";

const Message = ({ message, sentByCurrUser }) => {
    const isDarkMode = useContext(DarkModeContext);

    const messageClassName = sentByCurrUser
        ? "message sent"
        : "message received";
    const messageTimeClassName = sentByCurrUser
        ? isDarkMode
            ? "sent-time darkMode-item"
            : "time sent-time"
        : isDarkMode
        ? "received-time darkMode-item"
        : "time received-time";
    const sentOrReceived = sentByCurrUser ? "sent" : "received";

    const { hour, minute, amOpm } = dateFormatter(message?.updatedAt);
    const time = `${hour}:${minute} ${amOpm}`;

    return (
        <>
            <div className={messageClassName}>
                <div className="message-content">
                    <div className="text">{message.content}</div>
                </div>
            </div>
            <div className={messageTimeClassName}>
                {sentOrReceived} at {time}
            </div>
        </>
    );
};

export default Message;
