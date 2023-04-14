import { useState, createContext, useEffect } from "react";
import { loginUser } from "../api/userServices";

const defaultLoginContext = {
    isLoggedIn: false,
    userId: "",
    login: () => {},
    logout: () => {},
    userData: {},
};

const LoginContext = createContext(defaultLoginContext);

const LoginProvider = ({ children }) => {
    const [userData, setUserData] = useState(
        () => JSON.parse(localStorage.getItem("userData")) || {}
    );
    const [isLoggedIn, setIsLoggedIn] = useState(
        () => JSON.parse(localStorage.getItem("isLoggedIn")) || false
    );
    const [userId, setUserId] = useState(() => {
        const savedUserId = JSON.parse(localStorage.getItem("userId"));
        return savedUserId || "";
    });

    useEffect(() => {
        localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
        localStorage.setItem("userId", JSON.stringify(userId));
        localStorage.setItem("userData", JSON.stringify(userData));
    }, [isLoggedIn, userId, userData]);

    const login = async (email, password) => {
        try {
            const response = await loginUser(email, password);
            const user = response.user;
            setIsLoggedIn(true);
            setUserId(user._id);
            setUserData({
                username: user.username,
                conversations: user.conversations,
            });
            return response;
        } catch (error) {
            console.error(error);
            return error;
        }
    };

    const logout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userId");
        localStorage.removeItem("selectedUserData");
        setIsLoggedIn(false);
        setUserData({});
        setUserId("");
    };

    return (
        <LoginContext.Provider
            value={{ isLoggedIn, login, logout, userId, userData }}
        >
            {children}
        </LoginContext.Provider>
    );
};

export { LoginContext, LoginProvider };
