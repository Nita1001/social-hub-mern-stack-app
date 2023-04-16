import React, { useState } from "react";
import "./styles/Inventory.style.css";

const Inventory = () => {
    const [items, setItems] = useState([
        { id: 1, name: "Item", description: "1" },
        { id: 2, name: "Item", description: "2" },
        { id: 3, name: "Item", description: "3" },
    ]);

    const [favoriteItems, setFavoriteItems] = useState([]);

    const handleFavorite = (itemId) => {
        const itemToAdd = items.find((item) => item.id === itemId);
        if (!favoriteItems.find((item) => item.id === itemId)) {
            setFavoriteItems([...favoriteItems, itemToAdd]);
        }
    };

    const handleRemoveFavorite = (itemId) => {
        const filteredItems = favoriteItems.filter(
            (item) => item.id !== itemId
        );
        setFavoriteItems(filteredItems);
    };

    return (
        <div className="inventory-container">
            <h2>Inventory</h2>
            <div className="items-container">
                {items.map((item) => (
                    <div key={item.id} className="item">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <button onClick={() => handleFavorite(item.id)}>
                            <i className="fa-solid fa-bolt-lightning"></i>
                        </button>
                    </div>
                ))}
            </div>
            <h2>Favorites</h2>
            <div className="favorite-items-container">
                {favoriteItems.map((item) => (
                    <div key={item.id} className="favorite-item">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <button onClick={() => handleRemoveFavorite(item.id)}>
                            <i className="fa-solid fa-heart"></i>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Inventory;
