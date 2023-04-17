const SET_SELECTED_USER = "SET_SELECTED_USER";
const CLEAR_SELECTED_USER = "CLEAR_SELECTED_USER";

const usersReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_SELECTED_USER:
            return {
                ...state,
                selectedUser: payload,
            };
        case CLEAR_SELECTED_USER:
            return {
                ...state,
                selectedUser: null
            }
        default:
            return state;
    }
};

export default usersReducer;