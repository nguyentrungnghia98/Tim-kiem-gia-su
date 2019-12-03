import React, { Component } from "react";
import confirmLogin from "../../utils/confirmLogin";
import { Link } from "react-router-dom";
class NavBar extends Component {

  items = {
    NotLogin: [
      { text: "Trở thành gia sử", isHightLight: true, data:'signup' },
      { text: "Đăng nhập", data:'login'  },
      { text: "Đăng kí", data:'signup' }
    ],
    LoginAsStudent: [
      { text: "Hợp đồng học", isHightLight: true, link: "/contact" },
      { text: "Doanh thu", link: "/salary" },
      { text: "Tin nhắn", link: "/message" }
    ],
    LoginAsTeacher: [
      { text: "Yêu cầu dạy học", isHightLight: true, link: "/contact" },
      { text: "Hợp đồng học", link: "/contact" },
      { text: "Doanh thu", link: "/salary" },
      { text: "Tin nhắn", link: "/message" }
    ],
  };

  renderElement = () => {
    const { isAuthencated } = this.props;

    if (isAuthencated) {
      return (
        <ul className='navbar-nav ml-auto'>
          {this.items["LoginAsTeacher"].map((item, index) => {
            return (
              <li className='nav-item' key={item.text + index}>
                <Link className='nav-link' to={item.link}>
                  <span className={item.isHightLight ? 'hightlight' : ''}>
                    {item.text}
                  </span>
                </Link>
              </li>
            )
          })}
          <li className='nav-item'>
            <div className="dropdown avatar" data-toggle='dropdown'>
              <img src="https://i.imgur.com/6RUJRyM.png" alt="" />
            </div>
            <div className='dropdown-menu'>
              <button
                className='dropdown-item'
                type='button'
              >
                Cài đặt
              </button>
              <button
                className='dropdown-item'
                type='button'
              >
                Đăng xuất
              </button>
            </div>
          </li>
        </ul>
      )
    }

    return (
      <ul className='navbar-nav ml-auto'>
        {this.items["NotLogin"].map((item, index) => {
          return (
            <li className='nav-item' key={item.text + index}>
              <div
                href="/"
                className='nav-link'
                onClick={() => confirmLogin(item.data)}
              >
                {item.text}
              </div>
            </li>
          )
        })}
      </ul>
    )
  };

  render() {
    return (
      <nav className='navbar navbar-expand-lg navbar-light bg-white'>
        <Link to='/'>
          <div className='header--logo'>
            <img src="/images/logo-gia-su.png" alt="logo" />
          </div>
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          {this.renderElement()}
        </div>
      </nav>
    );
  }
}

export default NavBar;
