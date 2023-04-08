import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./sidebar.style.css";

const SharedLayout = () => {
    const [showSidebar, setShowSidebar] = useState(true);

    const handleToggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <>
            <div className={`sidebar ${showSidebar ? "active" : ""}`}>
                <button
                    className="sidebar-toggle"
                    onClick={handleToggleSidebar}
                >
                    <i className="fas fa-bars"></i>
                </button>
                <ul className="sidebar-menu">
                    <li className="sidebar-menu-item">
                        <Link to="/" className="sidebar-menu-link">
                            <i className="fas fa-home"></i>
                            <span className="sidebar-menu-text">Home</span>
                        </Link>
                    </li>
                    <li className="sidebar-menu-item">
                        <Link to="/login" className="sidebar-menu-link">
                            <i className="fas fa-sign-in-alt"></i>
                            <span className="sidebar-menu-text">Login</span>
                        </Link>
                    </li>
                    <li className="sidebar-menu-item">
                        <Link to="/register" className="sidebar-menu-link">
                            <i className="fas fa-user-plus"></i>
                            <span className="sidebar-menu-text">Register</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <Outlet />
        </>
    );
};

export default SharedLayout;
