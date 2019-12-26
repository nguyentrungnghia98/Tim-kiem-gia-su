import fetch from 'cross-fetch';
import {FETCH_MESSAGE_SUCCESS,FETCH_CONTRACT_REQUEST,FETCH_CONTRACT_SUCCESS, FETCH_CONTRACT_FAILURE, UPDATE_CONTRACT_SUCCESS,FETCH_COMPLAINT_SUCCESS, UPDATE_COMPLAINT_SUCCESS} from '../constants/actionTypes';


export const fetchContractRequest = () => {
    return {
        type: FETCH_CONTRACT_REQUEST
    };
}

export const fetchContractFailure = (message) => {
    return {
        type: FETCH_CONTRACT_FAILURE,
        message
    };
}
export const fetchContractSuccess = (contracts, totalContracts) => {
    return {
        type: FETCH_CONTRACT_SUCCESS,
        contracts,
        totalContracts,
    };
}

export const fetchContract = (token, page, sortBy) => {

    return dispatch => {
  
        dispatch(fetchContractRequest());

        const bearerToken = `Bearer ${  token}`;

        return fetch(`https://server-gia-su.herokuapp.com/contracts?page=${page !== undefined ? page : ''}&sortBy=${sortBy !== undefined ? sortBy : ''}`, {
            method: 'GET',
            headers: {
                'Authorization': bearerToken
            }
        })
        .then(
            response => response.json(),
            error => {
                dispatch(fetchContractFailure(error));
            }
        )
        .then(json => {
            dispatch(fetchContractSuccess(json.contracts, json.numberOfContracts));
        })
        .catch(err => {
            dispatch(fetchContractFailure(err));
        })
    }
  }

  export const updateContractSuccess = (message, contractID, status) => {
    return {
        type: UPDATE_CONTRACT_SUCCESS,
        message,
        contractID,
        status
    };
    
}
export const updateComplaintSuccess = (message, contractID, status) => {
    return {
        type: UPDATE_COMPLAINT_SUCCESS,
        message,
        contractID,
        status
    };
}
  export const fetchUpdateContract = (contractID, status, token, complaint) => {

    return dispatch => {

        dispatch(fetchContractRequest());

        const bearerToken = `Bearer ${  token}`;

        return fetch('https://server-gia-su.herokuapp.com/contracts/update', {
            method: 'POST',
            headers: {
                'Authorization': bearerToken,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                id: contractID,
                status
            })
        })
        .then(
            response => response.json(),
        )
        .then(json => {
            if (json.err)
                dispatch(fetchContractFailure(json.err));
            else{
                if(complaint){
                    dispatch(updateComplaintSuccess('Giải quyết khiếu nại thành công!', contractID, status))
                }else{
                dispatch(updateContractSuccess(json.message, contractID, status));
                }
            }
            
        })
    }
}

export const fetchComplaintSuccess = (complaints, totalComplaints) => {
    return {
        type: FETCH_COMPLAINT_SUCCESS,
        complaints,
        totalComplaints,
    };
}

export const fetchComplaint = (token, page) => {

    return dispatch => {
  
        dispatch(fetchContractRequest());

        const bearerToken = `Bearer ${  token}`;

        return fetch(`https://server-gia-su.herokuapp.com/contracts?page=${page !== undefined ? page : ''}&sortBy=processing_complaint`, {
            method: 'GET',
            headers: {
                'Authorization': bearerToken
            }
        })
        .then(
            response => response.json(),
            error => {
                dispatch(fetchContractFailure(error));
            }
        )
        .then(json => {
            dispatch(fetchComplaintSuccess(json.contracts, json.numberOfContracts));
        })
        .catch(err => {
            dispatch(fetchContractFailure(err));
        })
    }
  }

  export const fetchConversationSuccess = (messages) => {
    return {
        type: FETCH_MESSAGE_SUCCESS,
        messages
    };
}
  export const fetchConversation = (token, userOne, userTwo, dateComplaint) => {

    return dispatch => {

        const bearerToken = `Bearer ${  token}`;

        return fetch('https://server-gia-su.herokuapp.com/conversation/getListMessagesByTwoUser', {
            method: 'POST',
            headers: {
                'Authorization': bearerToken,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                userOne,
                userTwo,
                dateComplaint
            })
        })
        .then(
            response => response.json(),
        )
        .then(json => {
            if (json.err)
                dispatch(fetchContractFailure(json.err));
            else{

                dispatch(fetchConversationSuccess(json.messages))
            }
            
        })
    }
}