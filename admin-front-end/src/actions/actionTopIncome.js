import fetch from 'cross-fetch';
import {FETCH_TOPINCOME_REQUEST,FETCH_TOPINCOME_FAILURE,FETCH_TOP_TEACHER_INCOME_SUCCESS,FETCH_TOP_SKILL_INCOME_SUCCESS} from '../constants/actionTypes';
import Config from '../config';
export const fetchTopIncomeFailure = (message) => {
    return {
        type: FETCH_TOPINCOME_FAILURE,
        message
    };
}

export const fetchTopTeacherIncomeSuccess = (data) => {
    return {
        type: FETCH_TOP_TEACHER_INCOME_SUCCESS,
        data
    };
}

export const fetchTopSkillIncomeSuccess = (data) => {
    return {
        type: FETCH_TOP_SKILL_INCOME_SUCCESS,
        data
    };
}

export const fetchTopIncomeRequest = () => {
    return {
        type: FETCH_TOPINCOME_REQUEST,
    };
}

  export const fetchTopIncome = (token, startDate, typeGet) => {

    return dispatch => {
        dispatch(fetchTopIncomeRequest());
        const bearerToken = `Bearer ${  token}`;

        return fetch(`${Config.url}/receipt/getTop${typeGet}Income`, {
            method: 'POST',
            headers: {
                'Authorization': bearerToken,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                startDate
            })
        })
        .then(
            response => response.json(),
        )
        .then(json => {
            if (json.message)
                dispatch(fetchTopIncomeFailure(json.message));
            else{
                if(typeGet === 'Teacher')
                    dispatch(fetchTopTeacherIncomeSuccess(json.data));
                else{
                    dispatch(fetchTopSkillIncomeSuccess(json.data))
                }
            }
            
        })
    }
}