import React, { useEffect, useState, useContext } from "react";
import uniqid from "uniqid";
import { getUsers } from "../api/userServices.js";
import { LoginContext } from "../contexts/LoginContext.jsx";
import { SelectedUserContext } from "../contexts/SelectedUserContext.jsx";

import "./styles/usersList.style.css";
import {
    InventoryContext,
    useInventoryContext,
} from "../contexts/InventoryContext.jsx";

const UsersList = ({ type }) => {
    const [users, setUsers] = useState([]);
    const { userId } = useContext(LoginContext);
    const { handleUserSelected } = useContext(SelectedUserContext);
    const { handleSelectUser } = useInventoryContext(InventoryContext);
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await getUsers();
            const users = response.filter((user) => user._id !== userId);
            setUsers(users);
        };
        fetchUsers();
    }, [userId]);

    const handleClick = (user) => {
        if (type === "trading") {
            handleSelectUser(user);
        }
        handleUserSelected(user);
        console.log("user selected is", user);
    };
    return (
        <div className="container">
            <ul className="ul-container">
                {users.map((user) => (
                    <li
                        className="li-container"
                        key={uniqid()}
                        onClick={() => handleClick(user)}
                    >
                        {user.username}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;
