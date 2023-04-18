import React, { createContext, useReducer } from "react";
import usersReducer from "../reducers/usersReducer.js";
import { selectedUserActions } from "../constants/selectedUserActions";

const SelectedUserContext = createContext({
    selectedUser: {},
    isSelectedUser: false,
});

const SelectedUserProvider = ({ children }) => {
    const initialState = {
        selectedUser: {},
        isSelectedUser: false,
    };

    const [state, dispatch] = useReducer(usersReducer, initialState);

    const toggleIsSelectedUser = () => {
        dispatch({
            type: selectedUserActions.SET_IS_SELECTED_USER,
            payload: !state.isSelectedUser,
        });
    };

    const handleUserSelected = (user) => {
        toggleIsSelectedUser();
        dispatch({
            type: selectedUserActions.SET_SELECTED_USER,
            payload: user,
        });
        // dispatch({
        //     type: selectedUserActions.SET_IS_SELECTED_USER,
        //     payload: true,
        // });
        const selectedUserData = { _id: user._id, username: user.username };
        localStorage.setItem(
            "selectedUserData",
            JSON.stringify(selectedUserData)
        );
        localStorage.setItem("isSelectedUser", JSON.stringify(true));
    };

    const clearSelectedUser = () => {
        console.log("cleared", state.selectedUser);
        dispatch({ type: selectedUserActions.CLEAR_SELECTED_USER });
        localStorage.setItem("selectedUserData", JSON.stringify(null));
        localStorage.setItem("isSelectedUser", JSON.stringify(false));

        dispatch({
            type: selectedUserActions.SET_IS_SELECTED_USER,
            payload: false,
        });
    };

    return (
        <SelectedUserContext.Provider
            value={{
                selectedUser: state.selectedUser,
                isSelectedUser: state.isSelectedUser,
                handleUserSelected,
                clearSelectedUser,
            }}
        >
            {children}
        </SelectedUserContext.Provider>
    );
};

export { SelectedUserContext, SelectedUserProvider };
