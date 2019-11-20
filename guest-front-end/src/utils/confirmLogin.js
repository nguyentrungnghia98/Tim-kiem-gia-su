import { createConfirmation } from 'react-confirm';
import ConfirmationLogin from '../components/ConfirmationLogin';

const defaultConfirmation = createConfirmation(ConfirmationLogin);

const confirm = (confirmation, options = {}) => defaultConfirmation({ confirmation, ...options });

export default confirm;