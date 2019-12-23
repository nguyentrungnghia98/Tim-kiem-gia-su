import React, {useState, useEffect} from "react";
import {connect} from 'react-redux';
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink,
} from "shards-react";

import {logOut, fetchUser} from '../../../../actions/actionUser';

const UserActions = (props) => {

  const [visible, setVisible] = useState(false);
  const {logOut, userInfo, fetchUser} = props;

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const token = localStorage.getItem('token');
        await fetchUser(token);
      
      } catch (err) {
        console.log('err', err);
      }
    };
    fetchDataUser();
  }, []);

    return (
      <NavItem tag={Dropdown} caret toggle = {() => setVisible(!visible)}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src={userInfo ? `/${userInfo.avatar}` : "/"}
            alt=""
          />{" "}
          <span className="d-none d-md-inline-block">{userInfo !== null ? userInfo.fullName : ""}</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={visible}>
          <DropdownItem>
            <Link to="/user-profile"><i className="material-icons">&#xE7FD;</i> Tài khoản của tôi</Link>
          </DropdownItem>
          {/*<DropdownItem tag={Link} to="edit-user-profile">
            <i className="material-icons">&#xE8B8;</i> Edit Profile
          </DropdownItem>
          <DropdownItem tag={Link} to="file-manager-list">
            <i className="material-icons">&#xE2C7;</i> Files
          </DropdownItem>
          <DropdownItem tag={Link} to="transaction-history">
            <i className="material-icons">&#xE896;</i> Transactions
          </DropdownItem>*/}
          <DropdownItem divider />
          <DropdownItem className="text-danger" onClick={() => {localStorage.removeItem('token'); logOut()}}>
            <Link to="/login"> <i className="material-icons text-danger">&#xE879;</i> Đăng xuất</Link>
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.userReducer.isLoggedIn,
    userInfo: state.authReducer.userInfo
  };
};
export default connect(mapStateToProps, {logOut, fetchUser})(UserActions);