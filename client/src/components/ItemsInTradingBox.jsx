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
            <h4> Trading Box </h4>
            {/* {selectedOfferItems.length > 0 && <h4>My Offering items</h4>} */}
            <div className="trading-box">
                <div className="trading-items-container">
                    {selectedOfferItems?.map((item) => (
                        <div key={uniqid()} className="trading-item">
                            <h6>{item && item.title}</h6>
                            <img
                                src={item && item.images[1]}
                                alt={item && item.title}
                                onMouseOver={(e) =>
                                    (e.currentTarget.src = item.images[0])
                                }
                                onMouseOut={(e) =>
                                    (e.currentTarget.src = item.images[1])
                                }
                            />
                            <p>{item && item.description}</p>
                            <button
                                onClick={() =>
                                    handleRemoveOfferingItem(item._id)
                                }
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
                {requestedItems?.length > 0 && (
                    <div className="trading-items-container">
                        {requestedItems.map((item) => (
                            <div key={uniqid()} className="trading-item">
                                <h6>{item && item.title}</h6>
                                <img
                                    src={item && item.images[1]}
                                    alt={item && item.title}
                                    onMouseOver={(e) =>
                                        (e.currentTarget.src = item.images[0])
                                    }
                                    onMouseOut={(e) =>
                                        (e.currentTarget.src = item.images[1])
                                    }
                                />
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
                    </div>
                )}
            </div>
        </>
    );
};

export default ItemsInTradingBox;
