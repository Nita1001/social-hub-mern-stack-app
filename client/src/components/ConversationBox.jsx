import React, { useEffect, useContext, useRef } from "react";
import uniqid from "uniqid";
import Message from "./Message";
import "./styles/conversation.style.css";

const ConversationBox = ({ filteredMessages, currentUser }) => {
    const userData = JSON.parse(localStorage.getItem("userData")) || "";
    const selectedUserData =
        JSON.parse(localStorage.getItem("selectedUserData")) || "";

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

    return (
        <div className="conversation-box" ref={conversationBoxRef}>
            <h6>
                {userData.username} In Conversation with{" "}
                {selectedUserData.username}
            </h6>
            {filteredMessages &&
                filteredMessages.map(
                    (message) =>
                        // message.message !! I should change to message
                        message.message.from && (
                            <Message
                                key={uniqid()}
                                message={message.message}
                                sentByCurrUser={
                                    message.message.from === currentUser
                                }
                            />
                        )
                )}
        </div>
    );
};

export default ConversationBox;
