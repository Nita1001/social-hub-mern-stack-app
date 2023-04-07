import axios from "axios";
import { useState, createContext, useEffect } from "react";

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
        console.log("email", email);
        console.log("pass", password);
        try {
            const response = await axios.post("/api/users/login", {
                email: email.toString(),
                password: password.toString(),
            });
            console.log("222222", response);
            setIsLoggedIn(true);
            setUserId(response.data.userId);
        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => setIsLoggedIn(false);

    return (
        <LoginContext.Provider value={{ isLoggedIn, login, logout, userId }}>
            {children}
        </LoginContext.Provider>
    );
};

export { LoginContext, LoginProvider };
