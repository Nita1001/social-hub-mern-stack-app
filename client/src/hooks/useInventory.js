import { useState, useEffect } from "react";
import { items1 } from "../components/items";
import { users } from "../components/users";

const useInventory = () => {
    const [items, setItems] = useState(items1);
    const [tradingItems, setTradingItems] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedTradingItem, setSelectedTradingItem] = useState(null);
    const [selectedOfferItem, setSelectedOfferItem] = useState([]);
    const [userTradingItems, setUserTradingItems] = useState([]);
    const [isConfirmed, setIsConfirmed] = useState(true);

    useEffect(() => {
        // Filter out the item with status trade of the selected user
        const filteredItems = selectedUser
            ? selectedUser.items.filter((item) => item.status === "trade")
            : [];
        console.log('filtered items', filteredItems);
        setSelectedOfferItem([]);
        setUserTradingItems(filteredItems);
    }, [selectedUser]);

    const handleAddToTrading = (itemId) => {
        const itemToAdd = items.find((item) => item.id === itemId);
        if (
            itemToAdd.status === "trade" &&
            !tradingItems.find((item) => item.id === itemId)
        ) {
            setSelectedTradingItem(itemToAdd);
            setTradingItems([...tradingItems, itemToAdd]);
        }
    };

    const handleRemoveItemFromTradingBox = (itemId) => {
        setTradingItems((prevTradingItems) =>
            prevTradingItems.filter((item) => item.id !== itemId)
        );
    };

    const handleSelectUser = (user) => {
        setSelectedUser(user);
    };

    const handleOfferItem = (selectedItem) => {

        console.log('selectedOfferItem', selectedOfferItem);
        console.log('selectedItem', selectedItem);
        console.log('items', items);
        //debugger
        const isItemAlreadySelected = selectedOfferItem?.some(
            (item) => item.id === selectedItem.id
        );
        if (!isItemAlreadySelected) {
            setSelectedOfferItem([...selectedOfferItem, selectedItem]);
        } else {
            console.log("Item already selected!");
        }
    };

    const handleCancelTrade = () => {
        setSelectedOfferItem([]);
        setTradingItems([]);
    };

    const handleConfirmTrade = () => {
        setSelectedTradingItem([]);
        setSelectedOfferItem([]);
    };

    const handleConfirm = () => {
        if (selectedOfferItem.length > 0 && selectedTradingItem.length > 0) {
            setIsConfirmed(true);
            setTradingItems([...selectedOfferItem, ...selectedTradingItem]);
        }
    };
    const handleCompleteTrade = () => {
        console.log("TRADE COMPLETED !");

        if (isConfirmed) {
            const newItems = items.map((item) => {
                if (selectedOfferItem?.id && item.id === selectedOfferItem.id) {
                    return { ...item, status: "normal" };
                } else if (
                    selectedTradingItem?.id &&
                    item.id === selectedTradingItem.id
                ) {
                    return { ...item, status: "normal" };
                } else {
                    return item;
                }
            });
            setItems(newItems);
            setTradingItems([]);
            setSelectedTradingItem(null);
            setSelectedOfferItem([]);
            setIsConfirmed(false);
        }
    };

    const handleTradingItem = (selectedItem) => {
        const isItemAlreadySelected = selectedTradingItem.some(
            (item) => item.id === selectedItem.id
        );
        if (!isItemAlreadySelected) {
            const itemToTrade = items.find(
                (item) => item.id === selectedItem.id
            );
            setSelectedTradingItem([...selectedTradingItem, itemToTrade]);
        } else {
            console.log("Item already selected!");
        }
    };
    return {
        users,
        items,
        selectedUser,
        tradingItems,
        selectedOfferItem,
        selectedTradingItem,
        userTradingItems,
        isConfirmed,
        setItems,
        setTradingItems,
        setSelectedTradingItem,
        setSelectedOfferItem,
        handleSelectUser,
        handleAddToTrading,
        handleRemoveItemFromTradingBox,
        handleTradingItem,
        handleCompleteTrade,
        handleConfirm,
        handleConfirmTrade,
        handleCancelTrade,
        handleOfferItem
    };
};

export default useInventory;