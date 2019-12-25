import {FETCH_INCOME_FAILURE, FETCH_INCOME_SUCCESS,FETCH_INCOME_REQUEST} from '../constants/actionTypes'

const initalState = {
    isFetching: false,
    message: null,
    data: [{0:0}],
}
const staticReducer = (state = initalState, action) => {
    switch (action.type) {
        case FETCH_INCOME_REQUEST:
            return {
                ...state,              
                isFetching: true,
            }
        case FETCH_INCOME_FAILURE:
            return {
                ...state, 
                isFetching: false,          
                message: action.message,
            }
        case FETCH_INCOME_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.data
            }
        default:
            return state;
    }
}

export default staticReducer;