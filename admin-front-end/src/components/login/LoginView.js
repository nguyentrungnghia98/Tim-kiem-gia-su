import React , {useState} from 'react';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import './login.css';
import logo from '../../logo.png';


const LoginView = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {isLoggedIn, fetchLogin, /* fetchLoginFacebook */ isFetching, message} = props;

    if(isLoggedIn)
    return(
      <Redirect push to="/" />
    );
    
    const hashToken = window.location.hash;
    
    if(hashToken){
      const tokenN = hashToken.slice(1,hashToken.length);
      localStorage.setItem('token',tokenN);
      return (<Redirect push to="/" />);
    };
    

    document.title = 'Đăng nhập | Trang quản trị | Website Tìm kiếm gia sư';

    return (<div>
        <div className="login-register-form">
        <form className="form-signin" onSubmit={(e) => {e.preventDefault();fetchLogin(email,password);}}>
        <img src={logo} alt =" Avatar" className="avatar center" />

            
        <div className="division">
        <div className="line left" />
            <span>oOo</span>
        <div className="line right" />
        </div>
          <p className="text-red">{message}</p>
          <input type="email" id="inputEmail" className="form-control" placeholder="Tài khoản" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          <input type="password" id="inputPassword" className="form-control" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="btn btn-success btn-block" type="submit" disabled={isFetching}><i className="fas fa-sign-in-alt"/> Đăng nhập</button>
          
          <Link to="/reset-password" className="text-right">Quên mật khẩu ?</Link>
          <hr />
          
          <Link to="/register"><button className="btn btn-primary btn-block" type="button" id="btn-signup"><i className="fa fa-user-plus" /> Tạo tài khoản</button></Link>
        </form>
        
        <form action="/reset/password/" className="form-reset">
          <input type="email" id="resetEmail" className="form-control" placeholder="Email address" />
          <button className="btn btn-primary btn-block" type="submit">Reset Password</button>
          <a href="/" id="cancel_reset"><i className="fas fa-angle-left" /> Back</a>
        </form>
      </div>
      </div>
    );
};

export default LoginView;
