import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext.jsx";
import { getUsers } from "../api/userServices.js";
import "./styles/usersList.style.css";

const UsersList = ({ handleUserSelected }) => {
    const [users, setUsers] = useState([]);
    const { userId, userData } = useContext(LoginContext);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await getUsers();
            const users = response.filter((user) => user._id !== userId);
            console.log("users", users);
            setUsers(users);
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h2>Users List</h2>
            <ul className="ul-container">
                {users.map((user) => (
                    <li
                        className="li-container"
                        key={user._id}
                        onClick={() => handleUserSelected(user)}
                    >
                        {user.username}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;
