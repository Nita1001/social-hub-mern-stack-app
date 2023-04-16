import { createContext, useContext } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

export const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
    const [isDarkMode, toggleDarkMode] = useDarkMode();

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

export default DarkModeProvider;
