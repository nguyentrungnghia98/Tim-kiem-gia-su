import fetch from 'cross-fetch';
import {USER_REQUEST, USER_FAILURE, USER_SUCCESS} from '../constants/actionTypes'

export const userRequest = (message) => {
    return {
        type: USER_REQUEST,
        message
    };
}

export const userFailure = (message) => {
    return {
        type: USER_FAILURE,
        message
    };
}

export const userSuccess = (message) => {
    return {
        type: USER_SUCCESS,
        message
    };
}

export const fetchLogin = (email, password) => {

    return dispatch => {
  
        dispatch(userRequest('Đang đăng nhập... Vui lòng đợi trong giây lát ! '));

        return fetch('http://localhost:3000/user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(
            response => response.json(),
            error => {
                dispatch(userFailure(`Đã xảy ra lỗi : ${  error}`));
            }
        )
        .then(json => {
            if (json.token) {
                localStorage.setItem('token', json.token);
                dispatch(userSuccess('Đăng nhập thành công !'));         
            }
            else {
                dispatch(userFailure(json.message));
            }
        })
    }
}

export const fetchRegister = (email, password, fullName, role) => {

    return dispatch => {

        dispatch(userRequest('Đang tạo tài khoản... Vui lòng đợi trong giây lát ! '));

        return fetch('http://localhost:3000/user/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                fullName, 
                role
            })
        })
        .then(
            response => response.json(),
        )
        .then(json => {
            if (json.err)
                dispatch(userFailure(json.err));
            else{
                dispatch(userSuccess(json.message));
            }
            
        })
    }
}