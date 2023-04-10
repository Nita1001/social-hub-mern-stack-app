import { useState, createContext, useEffect } from "react";
import { loginUser } from "../api/userServices";

const LoginContext = createContext({
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
});

const LoginProvider = ({ children }) => {
    const [userData, setUserData] = useState({});
    const [userId, setUserId] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(
        JSON.parse(localStorage.getItem("isLoggedIn")) || false
    );

    useEffect(() => {
        localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    }, [isLoggedIn]);

    const login = async (email, password) => {
        try {
            const response = await loginUser(email, password);
            const user = response.data;
            setIsLoggedIn(true);
            setUserId(user.userId);
            setUserData({ name: user.username, phone: user.phone });
            return response;
        } catch (error) {
            console.error(error);
            return error;
        }
    };

    const logout = () => setIsLoggedIn(false);

    return (
        <LoginContext.Provider
            value={{ isLoggedIn, login, logout, userId, userData }}
        >
            {children}
        </LoginContext.Provider>
    );
};

export { LoginContext, LoginProvider };
