import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import CreateNewAccount from '../views/CreateNewAccount'
import {fetchRegister} from '../actions/actionUser'

const mapStateToProps = (state) => ({
    isFetching: state.userReducer.isFetching,
    message: state.userReducer.message,
    isLoggedIn : state.userReducer.isLoggedIn
})

const mapDispatchToProps = (dispatch) => ({
    fetchRegister: bindActionCreators(fetchRegister, dispatch),
})

const CreateUserContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateNewAccount);

export default CreateUserContainer;