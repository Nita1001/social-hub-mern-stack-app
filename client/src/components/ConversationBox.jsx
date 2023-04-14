import React, { useEffect, useContext, useRef } from "react";
import uniqid from "uniqid";

import { LoginContext } from "../contexts/LoginContext";
import { SelectedUserContext } from "../contexts/SelectedUserContext";
import useConversation from "../hooks/useConversation";
import Message from "./Message";
import "./styles/conversation.style.css";

const ConversationBox = ({ filteredMessages, currentUser }) => {
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

    return (
        <div className="conversation-box" ref={conversationBoxRef}>
            <h6>
                {currentUserData.username} In Conversation with{" "}
                {selectedUser.username}
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
