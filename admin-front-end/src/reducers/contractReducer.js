import {FETCH_MESSAGE_SUCCESS,FETCH_CONTRACT_REQUEST, FETCH_CONTRACT_SUCCESS, FETCH_CONTRACT_FAILURE, UPDATE_CONTRACT_SUCCESS,FETCH_COMPLAINT_SUCCESS, UPDATE_COMPLAINT_SUCCESS} from '../constants/actionTypes'

const initalState = {
    isFetching: false,
    message: null,
    listContracts: null,
    totalContracts: 0,
    messageComplaint: null,
    listComplaints: null,
    totalComplaints: 0,
    listMessages: []
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
        case  FETCH_COMPLAINT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                listComplaints: action.complaints,
                totalComplaints: action.totalComplaints
            }
           

        case UPDATE_CONTRACT_SUCCESS:
            return {
                ...state,
                isFetching: false, 
                message: action.message,
                listContracts: state.listContracts.map((contract, i) => contract._id === action.contractID ? {...contract, status: action.status}: contract)
            }
            case UPDATE_COMPLAINT_SUCCESS:
                return {
                    ...state,
                    isFetching: false, 
                    messageComplaint: action.message,
                    listComplaints: state.listComplaints.filter(complaint => complaint._id !== action.contractID),
                }
        case FETCH_MESSAGE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                listMessages: action.messages
            }
        default:
            return state;
    }
}

export default contractReducer;