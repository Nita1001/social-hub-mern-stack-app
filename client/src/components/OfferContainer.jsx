import React, { useContext } from "react";
import uniqid from "uniqid";

import { InventoryContext } from "../contexts/InventoryContext";

const OfferContainer = () => {
    const inventory = useContext(InventoryContext);
    const {
        selectedOfferItem,
        handleConfirmTrade,
        handleCancelTrade,
    } = inventory;

    return (
        <>
            {selectedOfferItem > 0 &&
                selectedOfferItem.map((selectedOfferItems) => {
                    <div key={uniqid()} className="offer-item">
                        <h4>Offered item:</h4>
                        <h5>{selectedOfferItems.name}</h5>
                        <button onClick={handleCancelTrade}>Cancel</button>
                        <button onClick={handleConfirmTrade}>
                            Confirm offered item
                        </button>
                    </div>;
                })}
        </>
    );
};

export default OfferContainer;
