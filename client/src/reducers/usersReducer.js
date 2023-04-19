import { selectedUserActions } from '../actions/selectedUserActions';

const usersReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case selectedUserActions.SET_SELECTED_USER:
            return {
                ...state,
                selectedUser: payload,
            };
        case selectedUserActions.CLEAR_SELECTED_USER:
            return {
                ...state,
                selectedUser: null
            };
        case selectedUserActions.SET_IS_SELECTED_USER:
            return {
                ...state,
                isSelectedUser: payload,
            };
        default:
            return state;
    }
};

export default usersReducer;