import { useState, createContext, useEffect } from "react";
import { loginUser } from "../api/userServices";

const LoginContext = createContext({
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
});

const LoginProvider = ({ children }) => {
    const [userId, setUserId] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(
        JSON.parse(localStorage.getItem("isLoggedIn")) || false
    );

    useEffect(() => {
        localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    }, [isLoggedIn]);

    const login = async (email, password) => {
        const response = await loginUser(email, password);
        setIsLoggedIn(true);
        setUserId(response.data.userId);
    };

    const logout = () => setIsLoggedIn(false);

    return (
        <LoginContext.Provider value={{ isLoggedIn, login, logout, userId }}>
            {children}
        </LoginContext.Provider>
    );
};

export { LoginContext, LoginProvider };
