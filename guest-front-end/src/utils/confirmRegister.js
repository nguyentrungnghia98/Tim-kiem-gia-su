import { createConfirmation } from 'react-confirm';
import ConfirmationRegister from '../components/ConfirmationRegister';

const defaultConfirmation = createConfirmation(ConfirmationRegister);

const confirm = (confirmation, options = {}) => defaultConfirmation({ 
    confirmation, 
    ...options
});

export default confirm;