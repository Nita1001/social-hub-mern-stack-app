import React, { useEffect, useState, useContext } from "react";

import { getUsers } from "../api/userServices.js";
import { LoginContext } from "../contexts/LoginContext.jsx";
import { SelectedUserContext } from "../contexts/SelectedUserContext.jsx";

import "./styles/usersList.style.css";

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const { userId } = useContext(LoginContext);
    const { handleUserSelected } = useContext(SelectedUserContext);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await getUsers();
            const users = response.filter((user) => user._id !== userId);
            setUsers(users);
        };
        console.log("rendered 1");
        fetchUsers();
    }, [userId]);

    const handleClick = (user) => {
        handleUserSelected(user);
    };
    return (
        <div>
            <h2>Friends</h2>
            <ul className="ul-container">
                {users.map((user) => (
                    <li
                        className="li-container"
                        key={user._id}
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
