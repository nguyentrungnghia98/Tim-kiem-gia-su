import {USER_REQUEST, USER_FAILURE, USER_SUCCESS, LOG_OUT} from '../constants/actionTypes'

const initalState = {
    isFetching: false,
    message: null,
    isLoggedIn: false
}

const userReducer = (state = initalState, action) => {
    switch (action.type) {
        case USER_REQUEST:
            return {
                ...state,
                isFetching: true,
                message: action.message
            }
        case USER_FAILURE:
            return {
                ...state,
                isFetching: false,
                message: action.message
            }

         case USER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                message: action.message,
                isLoggedIn: true,
            }
        case LOG_OUT:
            return {
                ...state,
                isLoggedIn: false,
                message: null
            }
        
        default:
            return state;
    }
}

export default userReducer;