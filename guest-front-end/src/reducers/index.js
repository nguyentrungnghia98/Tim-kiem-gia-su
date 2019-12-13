import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import alertReducer from './Alert';
import authenticationModal from '../modals/Authentication/AuthenticationReducer';
import setRoleModal from '../modals/SetRole/SetRoleReducer';
import sendMessageModal from '../modals/SendMessage/SendMessageReducer';
export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  authenticationModal,
  setRoleModal,
  sendMessageModal
});
