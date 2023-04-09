import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.style.css";

const Sidebar = () => {
    const [showSidebar, setShowSidebar] = useState(true);
    const handleToggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <div className={`sidebar ${showSidebar ? "active" : ""}`}>
            <button className="sidebar-toggle" onClick={handleToggleSidebar}>
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
                <li className="sidebar-menu-items">
                    <Link to="/messages" className="sidebar-menu-link">
                        <i className="fas fa-envelope"></i>
                        <span className="sidebar-menu-text">Messages</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
