import React from "react";
import { dateFormatter } from "../utils/dateFormatter.js";
import "./styles/conversation.style.css";

const Message = ({ message, sentByCurrUser }) => {
    const messageClassName = sentByCurrUser
        ? "message sent"
        : "message received";
    const messageTimeClassName = sentByCurrUser
        ? "time sent-time"
        : "time received-time";
    const sentOrReceived = sentByCurrUser ? "sent" : "received";
    const { hour, minute, amOpm } = dateFormatter(message?.updatedAt);
    const time = `${hour}:${minute} ${amOpm}`;
    console.log("TIME", time);
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
