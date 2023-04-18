import React, { useContext } from "react";
import uniqid from "uniqid";

import { InventoryContext } from "../contexts/InventoryContext";

const ItemsInTradingBox = () => {
    const inventory = useContext(InventoryContext);
    const {
        requestedItems,
        handleRemoveRequestedItem,
        selectedOfferItems,
        handleRemoveOfferingItem,
    } = inventory;

    return (
        <>
            {selectedOfferItems.length > 0 && <h4>My Offering items</h4>}
            <div className="trading-items-container">
                {selectedOfferItems?.map((item) => (
                    <div key={uniqid()} className="trading-item">
                        <h5>{item?.title}</h5>
                        <button
                            onClick={() => handleRemoveOfferingItem(item._id)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
            {requestedItems?.length > 0 && (
                <>
                    <h4> Trading on Items </h4>
                    {requestedItems.map((item) => (
                        <div key={uniqid()} className="trading-item">
                            <h5>{item && item.title}</h5>
                            <p>{item && item.description}</p>
                            <button
                                onClick={() =>
                                    handleRemoveRequestedItem(item._id)
                                }
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </>
            )}
        </>
    );
};

export default ItemsInTradingBox;
