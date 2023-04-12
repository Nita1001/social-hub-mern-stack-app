import { useContext, useEffect, useReducer } from 'react'
import { LoginContext } from "../contexts/LoginContext.jsx";
import usersReducer from '../reducers/usersReducer.js';

const SET_SELECTED_USER = "SET_SELECTED_USER";

const useUsers = () => {
    const { userId: currentUser, userData: currentUserData } = useContext(LoginContext);
    const initialState = {
        selectedUser: {}
    };
    const [state, dispatch] = useReducer(usersReducer, initialState);

    const handleUserSelected = (user) => {
        dispatch({
            type: SET_SELECTED_USER,
            payload: user
        })
        console.log('selectedUser.username', user.username)
    };

    useEffect(() => {
        console.log('useUsers state:', state);
    }, [state.selectedUser])

    return {
        selectedUser: state.selectedUser,
         ,
        currentUserData,
        handleUserSelected
}
}

export default useUsers