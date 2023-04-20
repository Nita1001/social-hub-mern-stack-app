import React, { useEffect } from "react";
import Inventory from "../components/Inventory";
import UsersList from "../components/UsersList";

import "../components/styles/Inventory.style.css";
const Storage = () => {
    useEffect(() => {
        document.body.classList.add("storage-page");
        return () => {
            document.body.classList.remove("storage-page");
        };
    }, []);

    return (
        <>
            <div className="users-container">
                <UsersList type="trading" />
            </div>
            <Inventory />;
        </>
    );
};
export default Storage;
