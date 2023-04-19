import React, { useEffect } from "react";
import Conversation from "../components/Conversation";
import UsersList from "../components/UsersList";

import "./styles/Home.style.css";
import "./styles/Messages.style.css";

const Messages = () => {
    useEffect(() => {
        document.body.classList.add("messages-page");
        return () => {
            document.body.classList.remove("messages-page");
        };
    }, []);

    return (
        <>
            <div className="UserMessages-container">
                <UsersList />
                <Conversation />
            </div>
        </>
    );
};

export default Messages;
