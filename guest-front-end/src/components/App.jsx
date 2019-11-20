import React from 'react';
import { Router, Switch, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import history from '../history';

import NavBar from './NavBar';
import Home from './Home';
import Profile from './Profile';

import '../css/App.css';
import '../css/Login.css';

// eslint-disable-next-line import/imports-first
import 'babel-polyfill';

const Root = (props) => {
    const { isAuthenticated, account, username, email, logout, avatar} = props;
    return (
        <>
            <ToastContainer/>
            <NavBar isAuthenticated={isAuthenticated}
                    account={account}
                    username={username}
                    email={email}
                    logout={logout}
                    avatar={avatar}/>
            <Router history={history}>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route exact path="/user/profile">
                        <Profile/>
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default Root;