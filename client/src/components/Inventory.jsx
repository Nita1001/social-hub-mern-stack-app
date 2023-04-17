import React, { useContext } from "react";

import TradingBox from "./TradingBox";
import { InventoryContext } from "../contexts/InventoryContext";
import UsersList from "./UsersList";
import "./styles/Inventory.style.css";

const Inventory = () => {
    const inventory = useContext(InventoryContext);

    const {
        users,
        items,
        selectedUser,
        handleSelectUser,
        handleAddToTrading,
    } = inventory;

    return (
        <div>
            <div className="inventory-container">
                <h2>My Inventory</h2>
                <div className="items-container">
                    {items.map((item) => (
                        <div key={item.id} className="item">
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            {item.status === "trade" && (
                                <button
                                    onClick={() => handleAddToTrading(item.id)}
                                >
                                    <i className="fa-solid fa-bolt-lightning"></i>
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="users-container">
                <h3>Select a user:</h3>
                {/* {users.map((user) => (
                    <button
                        key={user.id}
                        onClick={() => handleSelectUser(user)}
                        className={
                            selectedUser && selectedUser.id === user.id
                                ? "active"
                                : ""
                        }
                    >
                        {user.name}
                    </button>
                ))} */}
                <UsersList type="trading" />
            </div>
            {selectedUser && <TradingBox />}
        </div>
    );
};
export default Inventory;
