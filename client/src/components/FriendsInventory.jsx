import React, { useContext } from "react";
import uniqid from "uniqid";
import { InventoryContext } from "../contexts/InventoryContext";
import { SelectedUserContext } from "../contexts/SelectedUserContext";

const FriendsInventory = () => {
    const inventory = useContext(InventoryContext);
    const { handleRequestedItem, selectedUserInventory } = inventory;
    const { selectedUser } = useContext(SelectedUserContext);

    return (
        <>
            <h4 className="selectedUser-h4">
                {selectedUser.firstName}`s Inventory{" "}
            </h4>
            {selectedUserInventory?.length > 0 ? (
                <div className="trading-items-container">
                    {selectedUserInventory.map((items) => (
                        <>
                            <div key={uniqid()} className="trading-item">
                                {console.log("item", items.item)}
                                <h6>{items.item.title}</h6>
                                <img
                                    src={items.item && items.item.images[1]}
                                    alt={items.item && items.item.title}
                                    onMouseOver={(e) =>
                                        (e.currentTarget.src =
                                            items.item.images[0])
                                    }
                                    onMouseOut={(e) =>
                                        (e.currentTarget.src =
                                            items.item.images[1])
                                    }
                                />
                                <p>{items.item.description}</p>
                                <button
                                    onClick={() =>
                                        handleRequestedItem(items.item)
                                    }
                                >
                                    Select Item
                                </button>
                            </div>
                        </>
                    ))}
                </div>
            ) : (
                <h5 className="selectedUser-h5">
                    {selectedUser.firstName} is not trading his precious items
                </h5>
            )}
        </>
    );
};

export default FriendsInventory;
