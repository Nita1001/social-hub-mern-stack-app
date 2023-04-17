import { useState, useEffect } from "react";
import { items1 } from "../components/items";
import { users } from "../components/users";
import { getItems, getItem } from '../api/InventoryServices';
const useInventory = () => {
    const [items, setItems] = useState(items1);
    const [tradingItems, setTradingItems] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedTradingItem, setSelectedTradingItem] = useState(null);
    const [selectedOfferItem, setSelectedOfferItem] = useState([]);
    const [userTradingItems, setUserTradingItems] = useState([]);
    const [isConfirmed, setIsConfirmed] = useState(false);

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

    const getItemsOfSelectedUser = async (inventoryId) => {
        const itemIdsObject = await getItems(inventoryId);
        const itemIds = itemIdsObject.items;
        console.log('itemIds:', itemIds);
        const items = await Promise.all(itemIds.map(async (itemId) => {
            const item = await getItem(itemId);
            return item;
        }));
        console.log('items:', items);
    }

    const handleSelectUser = (user) => {
        console.log('user', user);
        const { firstName, lastName, inventoryId } = user;
        console.log('firstName, lastName, inventoryId', firstName, lastName, inventoryId)
        getItemsOfSelectedUser(inventoryId);
        // setSelectedUser(user);
    };

    const handleOfferItem = (selectedItem) => {
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
        setIsConfirmed(false);
        setSelectedOfferItem([]);
        setTradingItems([]);
    };

    const handleConfirmTrade = () => {
        setSelectedTradingItem([]);
        setSelectedOfferItem([]);
        setIsConfirmed(true);
        // if (selectedOfferItem.length > 0 && selectedTradingItem.length > 0) {
        //     setIsConfirmed(true);
        //     setTradingItems([...selectedOfferItem, ...selectedTradingItem]);
        // }
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
        handleConfirmTrade,
        handleCancelTrade,
        handleOfferItem,
    };
};

export default useInventory;