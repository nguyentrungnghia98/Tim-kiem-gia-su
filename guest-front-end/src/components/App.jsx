import React, {useState, useEffect} from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
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
import SetRoleModal from '../modals/SetRole/SetRole';
import { fetchUser } from '../actions/user';
import User from '../apis/user';
import {openSetRoleModal} from '../modals/SetRole/SetRoleAction';


const Root = (props) => {
  const { isSignedIn, fetchUser, openSetRoleModal } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        setLoading(true);
        const userToken = localStorage.getItem('userToken');
        const response = await User.get('/me', {
          headers: { authorization : userToken }
        });
        console.log('res', response);
        const user = response.data.results.object;
        fetchUser(user);
        setLoading(false);

        if(user.role === -1) {
          setTimeout(()=> {
            openSetRoleModal();
          }, 2000)
        }
      } catch (err) {
        console.log('err', err);
        setLoading(false);
      }
    };
    fetchDataUser();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {loading ? (
        <div className="splash">
          <div className="sk-folding-cube">
            <div className="sk-cube1 sk-cube"></div>
            <div className="sk-cube2 sk-cube"></div>
            <div className="sk-cube4 sk-cube"></div>
            <div className="sk-cube3 sk-cube"></div>
          </div>
        </div>
      ) : (
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
              <NavBar />
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/user/profile">
                  <Profile />
                </Route>
              </Switch>
              <Footer />

              <Authentication />
              <SetRoleModal />
              <Alert />
            </Router>
          </>
        )}
    </>

  );
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn
  };
};
export default connect(
  mapStateToProps,
  {
    fetchUser,
    openSetRoleModal
  }
)(Root);