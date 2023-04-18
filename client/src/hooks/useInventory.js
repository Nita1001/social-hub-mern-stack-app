import { useState, useContext, useEffect } from "react";
import { getItems, getItem } from '../api/InventoryServices';
import { SelectedUserContext } from "../contexts/SelectedUserContext";
import { InventoryContext } from "../contexts/InventoryContext";

const useInventory = () => {
    const { selectedUser, handleUserSelected } = useContext(SelectedUserContext);
    
    const [currentUserItems, setCurrentUserItems] = useState([]);
    const [selectedUserInventory, setSelectedUserInventory] = useState([]);
    const [selectedUserItems, setSelectedUserItems] = useState([]);

    const [selectedOfferItems, setSelectedOfferItems] = useState([]);
    const [requestedItems, setRequestedItems] = useState([]);
    const [isConfirmed, setIsConfirmed] = useState(false);
    
    const [tradingItems, setTradingItems] = useState([]);
    const [selectedTradingItem, setSelectedTradingItem] = useState(null);
    
    const itemsOfSelectedUser = (items) => {
        setSelectedUserItems(items);
    };

    const itemsOfCurrentUser = (items) => {
        setCurrentUserItems(items);
    };

    const getItemsOfUser = async (inventoryId, user) => {
        const itemIdsObject = await getItems(inventoryId);
        const itemIds = itemIdsObject.items;
        const items = await Promise.all(itemIds.map(async (itemId) => {
            return await getItem(itemId);
        }));
        user === 'currentUser' ? itemsOfCurrentUser(items) : itemsOfSelectedUser(items);
    }

    const fetchUserInventory = async (inventoryId) => {
         await getItemsOfUser(inventoryId, 'currentUser');
    }

    useEffect(() => {
        // Filtering items with status trading of selected user
        const filteredItems = selectedUserItems
            ? selectedUserItems.filter((items) => items.item.status === "trading")
            : [];
        setSelectedUserInventory(filteredItems);
    }, [selectedUser, selectedUserItems]);

    const handleRemoveOfferingItem = (itemId) => {
        // console.log('itemId | handleRemove', itemId);
        console.log('selectedOfferItem', selectedOfferItems);
        // debugger
        setSelectedOfferItems((prevTradingItems) =>
            prevTradingItems.filter((item) => item._id !== itemId)
        );
    };

    const handleSelectUser = async (user) => {
        const { firstName, lastName, inventoryId } = user;
        await getItemsOfUser(inventoryId, 'selectedUser');
        handleUserSelected(user);
    };

    const handleOfferedItem = (selectedItem) => {
        const isItemAlreadySelected = selectedOfferItems?.some(
            (item) => item._id === selectedItem._id
        );
        if (!isItemAlreadySelected) {
            setSelectedOfferItems([...selectedOfferItems, selectedItem]);
        } else {
            console.log("Item already selected!");
            return;
        }
    };

    const handleRequestedItem = (selectedItem) => {
        const isItemAlreadySelected = requestedItems?.some(
            (item) => item._id === selectedItem._id
        );
        if (!isItemAlreadySelected) {
            setRequestedItems([...requestedItems, selectedItem]);
        } else {
            console.log("Item already selected!");
            return;
        }
    };

    const handleRemoveRequestedItem = (itemId) => {
        setRequestedItems((prevTradingItems) => {
            const filteredItems = prevTradingItems.filter((item) => item._id !== itemId);
            return filteredItems;
        });
        setIsConfirmed(false);
    };

    const handleConfirmTrade = () => {
        setIsConfirmed(true);
        // if (selectedOfferItem.length > 0 && selectedTradingItem.length > 0) {
            //     setIsConfirmed(true);
            //     setTradingItems([...selectedOfferItem, ...selectedTradingItem]);
            // }
        // setSelectedTradingItem([]);
        // setSelectedOfferItem([]);
        };

    const handleCompleteTrade = () => {
        console.log("TRADE COMPLETED !");

        // if (isConfirmed) {
        //     const newItems = items.map((item) => {
        //         if (selectedOfferItems?._id && item._id === selectedOfferItems._id) {
        //             return { ...item, status: "normal" };
        //         } else if (
        //             selectedTradingItem?.id &&
        //             item._id === selectedTradingItem._id
        //         ) {
        //             return { ...item, status: "normal" };
        //         } else {
        //             return item;
        //         }
        //     });
        //     setItems(newItems);
        //     // setTradingItems([]);
        //     setSelectedTradingItem(null);
        //     setSelectedOfferItems([]);
        //     setIsConfirmed(false);
        // }
    };

  
    return {
        
        selectedUser,
        currentUserItems,
        selectedUserInventory,
        handleSelectUser,
        fetchUserInventory,
        
        requestedItems,
        selectedOfferItems,
        setSelectedOfferItems,
        handleRemoveOfferingItem,
        handleRemoveRequestedItem,
        
        handleOfferedItem,
        handleRequestedItem,
        
        handleCompleteTrade,
        handleConfirmTrade,
        
        isConfirmed,
        // tradingItems,
        // setTradingItems,
        // handleAddToTrading,
        // selectedTradingItem,
        // setSelectedTradingItem,
    };
};

export default useInventory;

// 444 halfway through

   // const [currentUserTradingItems, setCurrentUserTradingItems] = useState([]);
    // 
    // const handleAddToTrading = async (itemId) => {
    //     console.log('Adding item to tradingItems array');
    //     const itemToAdd = await getItem(itemId);
    //     console.log('itemToAdd', itemToAdd);
    //     if (!itemToAdd) {
    //         console.warn(`Item with id ${itemId} is not in trading status or cant be found`);
    //         // debugger
    //         return;
    //     }

    //     if (currentUserTradingItems.some((item) => item.id === itemId)) {
    //         console.warn(`Item with id ${itemId} is already in tradingItems array`, currentUserTradingItems);
    //         // debugger
    //         return;
    //     }

    //     setSelectedTradingItem(itemToAdd);
    //     setTradingItems((prevItems) => [...prevItems, itemToAdd]);
    // };