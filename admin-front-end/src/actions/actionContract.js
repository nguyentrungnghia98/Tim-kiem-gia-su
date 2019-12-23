import fetch from 'cross-fetch';
import {FETCH_CONTRACT_REQUEST,FETCH_CONTRACT_SUCCESS, FETCH_CONTRACT_FAILURE, UPDATE_CONTRACT_SUCCESS} from '../constants/actionTypes';


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

        return fetch(`http://localhost:3000/contracts?page=${page !== undefined ? page : ''}&sortBy=${sortBy !== undefined ? sortBy : ''}`, {
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

  export const fetchUpdateContract = (contractID, status, token) => {

    return dispatch => {

        dispatch(fetchContractRequest());

        const bearerToken = `Bearer ${  token}`;

        return fetch('http://localhost:3000/contracts/update', {
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
                dispatch(updateContractSuccess(json.message, contractID, status));
            }
            
        })
    }
}