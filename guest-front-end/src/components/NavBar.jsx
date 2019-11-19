import React, { Component } from 'react';
import confirmLogin from '../utils/confirmLogin';

class NavBar extends Component {

    elementNotLoggedIn = () => {
        return (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <button type="button" 
                        className="btn btn-outline-success" 
                        onClick={() => confirmLogin()}>
                        Đăng nhập
                    </button>
                </li>
            </ul>
        );
    }

    elementLoggedIn = () => {
        return (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a className="nav-link" href="/user/profile">Thông tin cá nhân</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="script:0" role="button">Đăng xuất</a>
                </li>
            </ul>
        );
    }

    renderElement = () => {
        const { isAuthencated } = this.props;

        if (isAuthencated) {
            return this.elementNotLoggedIn();
        }

        return this.elementNotLoggedIn();
    }

    render() {
        return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">GIA SƯ</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                {this.elementLoggedIn()}
            </div>
        </nav>
    );
    }
}

export default NavBar;