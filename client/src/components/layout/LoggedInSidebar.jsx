import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext.jsx";

const LoggedInSidebar = () => {
    const { logout } = useContext(LoginContext);

    return (
        <>
            <li className="sidebar-menu-items">
                <Link to="/profile" className="sidebar-menu-link">
                    <i className="fa-solid fa-user"></i>{" "}
                    <span className="sidebar-menu-text">Profile</span>
                </Link>
            </li>
            <li className="sidebar-menu-items">
                <Link to="/messages" className="sidebar-menu-link">
                    <i className="fas fa-envelope"></i>
                    {/* <div className="chatBubble"></div> */}
                    <span className="sidebar-menu-text">Messages</span>
                </Link>
            </li>
            <li className="sidebar-menu-items">
                <Link to="/storage" className="sidebar-menu-link">
                    <i className="fa-solid fa-box-archive"></i>
                    {/* <div className="shield"></div> */}
                    <span className="sidebar-menu-text">Inventory</span>
                </Link>
            </li>
            <li className="sidebar-menu-items">
                <Link
                    to="/login"
                    className="sidebar-menu-link"
                    onClick={logout}
                >
                    <i className="fa-solid fa-arrow-right-from-bracket fa-rotate-180"></i>
                    <span className="sidebar-menu-text">Log Out</span>
                </Link>
            </li>
        </>
    );
};

export default LoggedInSidebar;
