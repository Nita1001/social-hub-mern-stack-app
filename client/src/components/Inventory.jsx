import React, { useContext, useEffect } from "react";
import uniqid from "uniqid";

import { LoginContext } from "../contexts/LoginContext";
import { InventoryContext } from "../contexts/InventoryContext";
import { SelectedUserContext } from "../contexts/SelectedUserContext";

import UsersList from "./UsersList";
import TradingBox from "./TradingBox";
import FriendsInventory from "./FriendsInventory";
import "./styles/TradingBox.style.css";

import "./styles/Inventory.style.css";

const Inventory = () => {
    const inventory = useContext(InventoryContext);
    const {
        selectedUser,
        handleOfferedItem,
        // handleAddToTrading,
        currentUserItems,
        fetchUserInventory,
    } = inventory;
    const { userData } = useContext(LoginContext);
    const { isSelectedUser } = useContext(SelectedUserContext);

    useEffect(() => {
        fetchUserInventory(userData.inventoryId);
    }, []);

    return (
        <div>
            <h2>My Inventory</h2>
            <div className="inventory-container">
                <div className="items-container">
                    {currentUserItems && currentUserItems.length > 0 ? (
                        currentUserItems.map((items) => (
                            <div key={uniqid()} className="item">
                                <h6>{items.item.title}</h6>
                                <img
                                    src={items.item && items.item.images[1]}
                                    alt={items.item && items.item.title}
                                    onMouseOver={(e) =>
                                        (e.currentTarget.src =
                                            items.item.images[0])
                                    }
                                    onMouseOut={(e) =>
                                        (e.currentTarget.src =
                                            items.item.images[1])
                                    }
                                />
                                <p>{items.item.description}</p>
                                {items.item.status === "trading" && (
                                    <button
                                        onClick={() =>
                                            handleOfferedItem(items.item)
                                        }
                                    >
                                        <i className="fa-solid fa-bolt-lightning"></i>
                                    </button>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No items</p>
                    )}
                </div>
            </div>
            {isSelectedUser && (
                <div className="trading-container">
                    <FriendsInventory />
                </div>
            )}
            {selectedUser && <TradingBox />}
        </div>
    );
};
export default Inventory;
