import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import Login from '../views/Login'
import {fetchLogin} from '../actions/actionLogin'

const mapStateToProps = (state) => ({
    isFetching: state.loginReducer.isFetching,
    message: state.loginReducer.message,
    isLoggedIn : state.loginReducer.isLoggedIn
})

const mapDispatchToProps = (dispatch) => ({
    fetchLogin: bindActionCreators(fetchLogin, dispatch),
})

const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default LoginContainer