import fetch from 'cross-fetch';
import {LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS} from '../constants/actionTypes'

export const loginRequest = (message) => {
    return {
        type: LOGIN_REQUEST,
        message
    };
}

export const loginFailure = (message) => {
    return {
        type: LOGIN_FAILURE,
        message
    };
}

export const loginSuccess = (message) => {
    return {
        type: LOGIN_SUCCESS,
        message
    };
}

export const fetchLogin = (email, password) => {

    return dispatch => {
  
        dispatch(loginRequest('Đang đăng nhập... Vui lòng đợi trong giây lát ! '));

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
                dispatch(loginFailure(`Đã xảy ra lỗi : ${  error}`));
            }
        )
        .then(json => {
            if (json.token) {
                localStorage.setItem('token', json.token);
                dispatch(loginSuccess('Đăng nhập thành công !'));         
            }
            else {
                dispatch(loginFailure(json.message));
            }
        })
    }
}