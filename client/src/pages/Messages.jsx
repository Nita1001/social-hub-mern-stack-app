import React from "react";
import Conversation from "../components/Conversation";
import UsersList from "../components/UsersList";

import "./styles/Messages.style.css";

const Messages = () => {
    return (
        <div className="UserMessages-container">
            <UsersList />
            <Conversation />
        </div>
    );
};

export default Messages;
