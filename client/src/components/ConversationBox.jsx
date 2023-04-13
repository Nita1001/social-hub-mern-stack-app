import React, { useEffect, useContext, useRef } from "react";
import uniqid from "uniqid";

import { LoginContext } from "../contexts/LoginContext";
import { SelectedUserContext } from "../contexts/SelectedUserContext";
import useConversation from "../hooks/useConversation";
import Message from "./Message";

const ConversationBox = () => {
    const { userData: currentUserData } = useContext(LoginContext);
    const { selectedUser } = useContext(SelectedUserContext);
    const { filteredMessages, currentUser } = useConversation();
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
            {/* TODO: replace with icon/image of the users */}
            <h6>
                {currentUserData.username} In Conversation with{" "}
                {selectedUser.username}
            </h6>
            {filteredMessages?.map(
                (message, index) =>
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
