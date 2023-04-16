import React, { createContext, useReducer } from "react";
import usersReducer from "../reducers/usersReducer.js";

const SET_SELECTED_USER = "SET_SELECTED_USER";
const CLEAR_SELECTED_USER = "CLEAR_SELECTED_USER";

const SelectedUserContext = createContext({ selectedUser: {} });

const SelectedUserProvider = ({ children }) => {
    const initialState = { selectedUser: {} };
    const [state, dispatch] = useReducer(usersReducer, initialState);

    const handleUserSelected = (user) => {
        dispatch({
            type: SET_SELECTED_USER,
            payload: user,
        });
        const selectedUserData = { _id: user._id, username: user.username };
        localStorage.setItem(
            "selectedUserData",
            JSON.stringify(selectedUserData)
        );
    };

    const clearSelectedUser = () => {
        console.log("cleared", state.selectedUser);
        dispatch({ type: CLEAR_SELECTED_USER });
        localStorage.setItem("selectedUserData", JSON.stringify(NULL));
    };

    return (
        <SelectedUserContext.Provider
            value={{
                selectedUser: state.selectedUser,
                handleUserSelected,
                clearSelectedUser,
            }}
        >
            {children}
        </SelectedUserContext.Provider>
    );
};

export { SelectedUserContext, SelectedUserProvider };
