
import fetch from 'cross-fetch';
import {FETCH_INCOME_REQUEST,FETCH_INCOME_FAILURE,FETCH_INCOME_SUCCESS} from '../constants/actionTypes';

export const fetchIncomeFailure = (message) => {
    return {
        type: FETCH_INCOME_FAILURE,
        message
    };
}

export const fetchIncomeSuccess = (data) => {
    return {
        type: FETCH_INCOME_SUCCESS,
        data
    };
}

export const fetchIncomeRequest = () => {
    return {
        type: FETCH_INCOME_REQUEST,
    };
}

  export const fetchIncome = (token, from, to) => {

    return dispatch => {
        dispatch(fetchIncomeRequest());
        const bearerToken = `Bearer ${  token}`;

        return fetch('http://localhost:3001/receipt/getListByTimeScope', {
            method: 'POST',
            headers: {
                'Authorization': bearerToken,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                from,
                to
            })
        })
        .then(
            response => response.json(),
        )
        .then(json => {
            if (json.message)
                dispatch(fetchIncomeFailure(json.message));
            else{
                dispatch(fetchIncomeSuccess(json.data));
            }
            
        })
    }
}