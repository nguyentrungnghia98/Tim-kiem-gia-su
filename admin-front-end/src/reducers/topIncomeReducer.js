import {FETCH_TOPINCOME_FAILURE, FETCH_TOP_TEACHER_INCOME_SUCCESS,FETCH_TOPINCOME_REQUEST, FETCH_TOP_SKILL_INCOME_SUCCESS} from '../constants/actionTypes'

const initalState = {
    isFetching: false,
    message: null,
    dataTeacher: [],
    dataSkill: []
}
const staticReducer = (state = initalState, action) => {
    switch (action.type) {
        case FETCH_TOPINCOME_REQUEST:
            return {
                ...state,              
                isFetching: true,
            }
        case FETCH_TOPINCOME_FAILURE:
            return {
                ...state, 
                isFetching: false,          
                message: action.message,
            }
        case FETCH_TOP_TEACHER_INCOME_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataTeacher: action.data
            }
            case FETCH_TOP_SKILL_INCOME_SUCCESS:
                return {
                    ...state,
                    isFetching: false,
                    dataSkill: action.data
                }
        default:
            return state;
    }
}

export default staticReducer;