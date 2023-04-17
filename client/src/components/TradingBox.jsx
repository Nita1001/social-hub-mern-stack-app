import React, { useContext } from "react";
import uniqid from "uniqid";
import UserTradingItems from "./UserTradingItems";
import OfferContainer from "./OfferContainer";
import { InventoryContext } from "../contexts/InventoryContext";

import "./styles/TradingBox.style.css";

const TradingBox = () => {
    const inventory = useContext(InventoryContext);

    const {
        selectedOfferItem,
        tradingItems,
        handleRemoveItemFromTradingBox,
        handleCompleteTrade,
        handleConfirm,
        handleOfferItem,
        userTradingItems,
        isConfirmed,
    } = inventory;

    return (
        <>
            <div className="trading-container">
                <UserTradingItems userTradingItems={userTradingItems} />
            </div>
            <h4>Your selected trading items:</h4>
            <div className="trading-items-container">
                {tradingItems.map((item) => (
                    <div key={item.id} className="trading-item">
                        <h5>{item.name}</h5>
                        <button
                            onClick={() =>
                                handleRemoveItemFromTradingBox(item.id)
                            }
                        >
                            Remove
                        </button>
                        <button onClick={() => handleOfferItem(item)}>
                            offer for trade
                        </button>
                    </div>
                ))}
            </div>
            <div className="offer-container">
                <OfferContainer />
            </div>
            <div className="confirm-trade">
                {selectedOfferItem?.length > 0 && (
                    <>
                        <h4>Selected Items of User B</h4>
                        {selectedOfferItem.map((item) => (
                            <div key={uniqid()} className="trading-item">
                                <h5>{item && item.name}</h5>
                                <p>{item && item.description}</p>
                            </div>
                        ))}

                        <button onClick={handleConfirm}>Confirm Trade</button>
                        <p>Waiting for other user to confirm...</p>
                    </>
                )}
                {!isConfirmed && (
                    <>
                        <button onClick={handleCompleteTrade}>
                            Complete Trade
                        </button>
                        <p>
                            Both users have confirmed. Click 'Complete Trade' to
                            finalize.
                        </p>
                    </>
                )}
            </div>
        </>
    );
};

export default TradingBox;
