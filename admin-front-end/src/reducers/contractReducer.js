import {FETCH_CONTRACT_REQUEST, FETCH_CONTRACT_SUCCESS, FETCH_CONTRACT_FAILURE, UPDATE_CONTRACT_SUCCESS} from '../constants/actionTypes'

const initalState = {
    isFetching: false,
    message: null,
    listContracts: null,
    totalContracts: 0
}
const contractReducer = (state = initalState, action) => {
    switch (action.type) {
        case FETCH_CONTRACT_REQUEST:
            return {
                ...state,
                isFetching: true,
            }
        case FETCH_CONTRACT_FAILURE:
            return {
                ...state,
                isFetching: false,
                message: action.message
            }
    
        case FETCH_CONTRACT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                listContracts: action.contracts,
                totalContracts: action.totalContracts
            }

        // case ADD_TAG_SKILL_SUCCESS:
        //     return {
        //         ...state,
        //         isFetching: false,
        //         message: action.message,
        //         tagskills : state.tagskills.concat(action.tagskill)
        //     }
        // case DELETE_TAG_SKILL_SUCCESS:
        //     return {
        //         ...state,
        //         isFetching: false,
        //         message: action.message,
        //         tagskills: state.tagskills.filter(tagskill => tagskill._id !== action.id)
        //     }
        case UPDATE_CONTRACT_SUCCESS:
            return {
                ...state,
                isFetching: false, 
                message: action.message,
                listContracts: state.listContracts.map((contract, i) => contract._id === action.contractID ? {...contract, status: action.status}: contract)
            }
        default:
            return state;
    }
}

export default contractReducer;