import React, { useContext } from "react";
import uniqid from "uniqid";

import { InventoryContext } from "../contexts/InventoryContext";

import ItemsInTradingBox from "./ItemsInTradingBox";
// import TradeConfirmation from "./TradeConfirmation";

import "./styles/TradingBox.style.css";

const TradingBox = () => {
    const inventory = useContext(InventoryContext);
    const {
        handleConfirmTrade,
        // handleCompleteTrade,
        // handleCancelTrade,
        // isConfirmed,
    } = inventory;

    return (
        <>
            <div className="offer-container">
                <ItemsInTradingBox />
            </div>
            <div className="confirm-trade">
                <button onClick={handleConfirmTrade}>Confirm Trade</button>
                <p>Waiting for User B to confirm...</p>
                {/* {isConfirmed && (
                    <>
                        <button onClick={handleCompleteTrade}>
                            Complete Trade
                        </button>
                        <button onClick={() => handleCancelTrade("ok")}>
                            Cancel Trade
                        </button>
                        <p>
                            Both users have confirmed. 'Complete Trade' to
                            finalize.
                        </p>
                    </>
                )} */}
                {/* <TradeConfirmation /> */}
                {/* socket io */}
            </div>
        </>
    );
};

export default TradingBox;
