import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import Login from '../views/Login'
import {fetchLogin} from '../actions/actionUser'

const mapStateToProps = (state) => ({
    isFetching: state.userReducer.isFetching,
    message: state.userReducer.message,
    isLoggedIn : state.userReducer.isLoggedIn
})

const mapDispatchToProps = (dispatch) => ({
    fetchLogin: bindActionCreators(fetchLogin, dispatch),
})

const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default LoginContainer