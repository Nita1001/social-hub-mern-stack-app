import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext.jsx";
import "../styles/Sidebar.style.css";
import LoggedInSidebar from "./LoggedInSidebar.jsx";

const Sidebar = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const { isLoggedIn } = useContext(LoginContext);
    const handleToggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <div className={`sidebar ${showSidebar ? "active" : ""}`}>
            <button className="sidebar-toggle" onClick={handleToggleSidebar}>
                {/* <i className="fas fa-bars"></i> */}
            </button>
            <ul className="sidebar-menu">
                <li className="sidebar-menu-item">
                    <Link to="/" className="sidebar-menu-link">
                        <i className="fas fa-home"></i>
                        <span className="sidebar-menu-text">Home</span>
                    </Link>
                </li>
                {!isLoggedIn && (
                    <li className="sidebar-menu-item">
                        <Link to="/login" className="sidebar-menu-link">
                            <i className="fas fa-sign-in-alt"></i>
                            <span className="sidebar-menu-text">Login</span>
                        </Link>
                    </li>
                )}
                {isLoggedIn && <LoggedInSidebar />}
            </ul>
        </div>
    );
};

export default Sidebar;
