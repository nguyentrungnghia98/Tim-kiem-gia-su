import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import alertReducer from './Alert';
import authenticationModal from '../modals/Authentication/AuthenticationReducer';


export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  authenticationModal
});
