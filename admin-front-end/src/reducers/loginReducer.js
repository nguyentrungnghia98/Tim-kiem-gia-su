import {LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS, LOG_OUT} from '../constants/actionTypes'

const initalState = {
    isFetching: false,
    message: null,
    isLoggedIn: false
}

const loginReducer = (state = initalState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isFetching: true,
                message: action.message
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                isFetching: false,
                message: action.message
            }

         case LOGIN_SUCCESS:
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

export default loginReducer;