import { FETCH_USER, SIGN_IN, SIGN_OUT } from './types';
import history from '../history';

export const fetchUser = (user) => {
  return {
    type: FETCH_USER,
    user
  };
};

export const signIn = (response) => async (dispatch) => {
  console.log('action signIn');
  dispatch({
    type: SIGN_IN,
    user: response
  });
  localStorage.setItem('userToken', `JWT ${response.token}`);
  // history.push('/profile');
};

export const logOut = () => async (dispatch) => {
  localStorage.setItem('userToken', '');
  dispatch({
    type: SIGN_OUT
  });
  //history.push('/login');
};
