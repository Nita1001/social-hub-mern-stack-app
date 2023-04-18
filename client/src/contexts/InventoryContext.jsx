import React, { createContext, useContext } from "react";
import useInventory from "../hooks/useInventory";

const InventoryContext = createContext();

const InventoryProvider = ({ children }) => {
    const inventory = useInventory();

    return (
        <InventoryContext.Provider value={inventory}>
            {children}
        </InventoryContext.Provider>
    );
};
export const useInventoryContext = () => useContext(InventoryContext);
export { InventoryContext, InventoryProvider };
