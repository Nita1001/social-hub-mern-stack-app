import React, { useContext } from "react";
import uniqid from "uniqid";
import { InventoryContext } from "../contexts/InventoryContext";

const UserTradingItems = ({ userTradingItems }) => {
    const inventory = useContext(InventoryContext);
    const { handleOfferItem } = inventory;

    return (
        <>
            {userTradingItems?.length > 0 ? (
                <div className="trading-items-container">
                    {userTradingItems.map((item) => (
                        <div key={uniqid()} className="trading-item">
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <button onClick={() => handleOfferItem(item)}>
                                Select Item
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <h2>No items marked for trade</h2>
            )}
        </>
    );
};

export default UserTradingItems;
