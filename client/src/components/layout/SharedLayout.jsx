import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./sidebar.style.css";

const SharedLayout = () => {
    return (
        <>
            <Sidebar />
            <div className="outlet">
                <Outlet />
            </div>
        </>
    );
};

export default SharedLayout;
