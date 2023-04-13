import React, { createContext, useReducer } from "react";
import usersReducer from "../reducers/usersReducer.js";

const SET_SELECTED_USER = "SET_SELECTED_USER";

const SelectedUserContext = React.createContext({ selectedUser: {} });

const SelectedUserProvider = ({ children }) => {
    const initialState = { selectedUser: {} };
    const [state, dispatch] = useReducer(usersReducer, initialState);

    const handleUserSelected = (user) => {
        dispatch({
            type: SET_SELECTED_USER,
            payload: user,
        });
        console.log("selectedUser.username", user.username);
    };

    return (
        <SelectedUserContext.Provider
            value={{ selectedUser: state.selectedUser, handleUserSelected }}
        >
            {children}
        </SelectedUserContext.Provider>
    );
};

export { SelectedUserContext, SelectedUserProvider };
