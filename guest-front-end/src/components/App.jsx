import React from 'react';
import { Router, Switch, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import history from '../history';

import Footer from './shared/Footer';
import NavBar from './shared/NavBar';
import Home from './Home/Home';
import Profile from './Profile';

import '../css/App.scss';
import '../css/Login.scss';

// eslint-disable-next-line import/imports-first
import 'babel-polyfill';

const Root = (props) => {
    const { isAuthenticated, account, username, email, logout, avatar} = props;
    return (
        <>
            <ToastContainer/>
            
            <Router history={history}>
                <NavBar isAuthenticated={isAuthenticated}
                    account={account}
                    username={username}
                    email={email}
                    logout={logout}
                    avatar={avatar}/>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route exact path="/user/profile">
                        <Profile/>
                    </Route>
                </Switch>
                <Footer/>
            </Router>
        </>
    );
}

export default Root;