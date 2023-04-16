import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { LoginProvider } from "./contexts/LoginContext";
import { SelectedUserProvider } from "./contexts/SelectedUserContext";
import DarkModeProvider from "./contexts/DarkModeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <LoginProvider>
            <SelectedUserProvider>
                <DarkModeProvider>
                    <App />
                </DarkModeProvider>
            </SelectedUserProvider>
        </LoginProvider>
    </React.StrictMode>
);
