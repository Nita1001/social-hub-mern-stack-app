import React, { useEffect } from "react";
import Inventory from "../components/Inventory";

const Storage = () => {
    useEffect(() => {
        document.body.classList.add("storage-page");
        return () => {
            document.body.classList.remove("storage-page");
        };
    }, []);

    return <Inventory />;
};
export default Storage;
