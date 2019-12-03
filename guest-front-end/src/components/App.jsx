import React from 'react';
import { Router, Switch, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import history from '../history';

import Footer from './shared/Footer';
import NavBar from './shared/NavBar';
import Home from './Home/Home';
import Profile from './Profile';
import Alert from '../components/shared/Alert/Alert'
import '../css/App.scss';
import 'react-toastify/dist/ReactToastify.css';
// eslint-disable-next-line import/imports-first
import 'babel-polyfill';
import Authentication from '../modals/Authentication/Authentication';

const Root = (props) => {
    const { isAuthenticated, account, username, email, logout, avatar} = props;
    return (
        <>
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnVisibilityChange
              draggable
              pauseOnHover
            
            />
            
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

                <Authentication/>
                <Alert />
            </Router>
        </>
    );
}

export default Root;