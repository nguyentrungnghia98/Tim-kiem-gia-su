import fetch from 'cross-fetch';
import {USER_REQUEST, USER_FAILURE, USER_SUCCESS, LOG_OUT, GET_USER_REQUEST, GET_USER_FAILURE, GET_USER_SUCCESS, UPDATE_USER, GET_LIST_USER_SUCCESS, GET_LIST_STUDENT_SUCCESS} from '../constants/actionTypes'

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
                dispatch(userSuccess(''));         
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

export const updateUser = (userInfo) => {
    return {
        type: UPDATE_USER,
        userInfo
    };
}

export const fetchUpdate = (password, repassword, token) => {

    return dispatch => {

        dispatch(userRequest('Đang cập nhật... Vui lòng đợi trong giây lát ! '));

        const bearerToken = `Bearer ${  token}`;

        return fetch('http://localhost:3000/profile/update-profile', {
            method: 'POST',
            headers: {
                'Authorization': bearerToken,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                
                password,
                repassword
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
                //dispatch(updateUser(json.user))
            }
            
        })
    }
}

export const getUserRequest = () => {
    return {
        type: GET_USER_REQUEST
    };
}

export const getUserFailure = () => {
    return {
        type: GET_USER_FAILURE
    };
}
export const getUserSuccess = (userInfo) => {
    return {
        type: GET_USER_SUCCESS,
        userInfo
    };
}

export const fetchUser = (token) => {

    return dispatch => {
  
        dispatch(getUserRequest());

        const bearerToken = `Bearer ${  token}`;

        return fetch('http://localhost:3000/profile', {
            method: 'GET',
            headers: {
                'Authorization': bearerToken
            }
        })
        .then(
            response => response.json(),
            error => {
                console.log(error);
                dispatch(getUserFailure());
            }
        )
        .then(json => {
            dispatch(getUserSuccess(json));
        })
        .catch(err => {
            console.log(err);
            dispatch(getUserFailure());
        })
    }
  }

  export const getListUserSuccess = (listUsers) => {
    return {
        type: GET_LIST_USER_SUCCESS,
        listUsers
    };
}

  export const fetchListUser = (token) => {

    return dispatch => {
  
        dispatch(getUserRequest());

        const bearerToken = `Bearer ${  token}`;

        return fetch('http://localhost:3000/list-users/teacher', {
            method: 'GET',
            headers: {
                'Authorization': bearerToken
            }
        })
        .then(
            response => response.json(),
            error => {
                console.log(error);
                dispatch(getUserFailure());
            }
        )
        .then(json => {
            dispatch(getListUserSuccess(json));
        })
        .catch(err => {
            console.log(err);
            dispatch(getUserFailure());
        })
    }
  }

  export const getListStudentSuccess = (listStudents) => {
    return {
        type: GET_LIST_STUDENT_SUCCESS,
        listStudents
    };
}

  export const fetchListStudents = (token) => {

    return dispatch => {
  
        dispatch(getUserRequest());

        const bearerToken = `Bearer ${  token}`;

        return fetch('http://localhost:3000/list-users/student', {
            method: 'GET',
            headers: {
                'Authorization': bearerToken
            }
        })
        .then(
            response => response.json(),
            error => {
                console.log(error);
                dispatch(getUserFailure());
            }
        )
        .then(json => {
            dispatch(getListStudentSuccess(json));
        })
        .catch(err => {
            console.log(err);
            dispatch(getUserFailure());
        })
    }
  }

export const logOut = () => {
    return {
        type: LOG_OUT,
    }
}