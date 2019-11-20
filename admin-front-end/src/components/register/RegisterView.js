import React, {useState} from 'react';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import '../login/LoginView';
import logo from '../../logo.png';
// import {Form, Button} from 'react-bootstrap'

const RegisterView = (props) => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const {isFetching, isLoggedIn, message, fetchRegister} = props;

    if(isLoggedIn)
    return(
      <Redirect push to="/" />
    );
    
    document.title = 'Đăng kí | Trang quản trị | Website Tìm kiếm gia sư';

    return (
        <div className = "login-register-form">
          <form className="form-signup" onSubmit={(e) => {e.preventDefault(); fetchRegister(email,password,fullName);}}>
          <img src={logo} alt =" Avatar" className="avatar center" />

            
          <div className="division">
          <div className="line left" />
              <span>oOo</span>
          <div className="line right" />
          </div>
            
            
            <p className="text-red" >{(password !== rePassword && rePassword) ? 'Mật khẩu không trùng khớp !' : message}</p>

            <input type="text" id="full-name" className="form-control" placeholder="Họ và tên " value={fullName} onChange={(e) => setFullName(e.target.value)} required/>
            <input type="email" id="user-email" className="form-control" placeholder="Địa chỉ Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            <input type="password" id="user-pass" className="form-control" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            <input type="password" id="user-repeatpass" className="form-control" placeholder="Nhập lại mật khẩu" value={rePassword} onChange={(e) => setRePassword(e.target.value)} required/>
            <button className="btn btn-primary btn-block" type="submit" disabled={isFetching || password !== rePassword}>Đăng kí</button>
            <div className="forgot">
                <span>Đã có tài khoản? </span>
                <Link to="/login">Đăng nhập</Link>
            </div>          
          </form>
        </div>
    );
};

export default RegisterView;
