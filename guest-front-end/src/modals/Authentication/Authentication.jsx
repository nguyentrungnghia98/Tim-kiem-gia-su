import React, { useState, useEffect } from "react";

import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import User from '../../apis/user';
import { toast } from "react-toastify";
import { connect } from 'react-redux';
import { signIn } from '../../actions/user';
import { closeAuthenticationModal } from './AuthenticationAction';
import './Authentication.scss';
import CssTextField from './CssTextField';
import {
  Dialog,
  DialogContent
} from '@material-ui/core';

const Authentication = props => {
  const {
    toggle,
    modeModal,
    closeAuthenticationModal,
    signIn
  } = props;
  console.log('mode', modeModal)
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailRegister, setEmailRegister] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [role, setRole] = useState('student');
  const [mode, setMode] = useState(modeModal);
  const [error, setError] = useState({ email: '', password: '', emailRegister: '', passwordRegister: '', verifyCode: '', name: '' });

  useEffect(() => {
    setMode(props.modeModal)
    setLoading(false);
  }, [props.modeModal])

  useEffect(() => {
    setLoading(false);
  }, [props.toggle])

  function handleClose() {
    console.log('close')
    closeAuthenticationModal();
  }


  function handleChange(event) {
    const { value, name } = event.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'name':
        setName(value);
        break;
      case 'emailRegister':
        setEmailRegister(value);
        break;
      case 'passwordRegister':
        setPasswordRegister(value);
        break;
      case 'verifyCode':
        setVerifyCode(value);
      default:
        return
    }
  }



  function responseFacebook(response) {
    console.log(response);
    const data = {
      email: response.email
    };
    handleLoginSocial(data);
  }

  function responseGoogle(response) {
    console.log(response);
    const data = {
      email: response.profileObj.email
    };
    handleLoginSocial(data);
  }

  function handleLoginSocial(_data) {
    const token = jwt.generateJWT(_data, process.env.SECRET_KEY, process.env.EXPIRE_IN);
    const url = `/user/loginSocial`;
    const data = { token };
    const message = "Đăng nhập thành công"

    const callback = (user) => {
      signIn(user);
      closeAuthenticationModal()
    };
    callApiPost(url, data, message, callback);
  }

  function validFormInput() {
    let check = true;
    // eslint-disable-next-line
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (mode === 'login') {
      if (re.test(String(email).toLowerCase())) {
        if (error.email !== '') setError({ ...error, email: '' });
      } else {
        setError({ ...error, email: 'Vui lòng nhập đúng định dạng email!' });
        check = false;
      }
      if (password.length < 4 || password.length > 20) {
        setError({ ...error, password: 'Vui lòng nhập tên có độ dài từ 4 đến 20 kí tự!' });
        check = false;
      } else {
        setError({ ...error, password: '' });
      }
    }

    if (mode === "signup") {
      if (re.test(String(emailRegister).toLowerCase())) {
        if (error.emailRegister !== '') setError({ ...error, emailRegister: '' });
      } else {
        setError({ ...error, emailRegister: 'Vui lòng nhập đúng định dạng email!' });
        check = false;
      }
    }

    if (mode === 'finish_signup') {
      if (name.length < 4 || name.length > 20) {
        setError({ ...error, name: 'Vui lòng nhập tên có độ dài từ 1 đến 50 kí tự!' });
        check = false;
      } else {
        setError({ ...error, name: '' });
      }

      if (passwordRegister.length < 1 || passwordRegister.length > 50) {
        setError({ ...error, passwordRegister: 'Vui lòng nhập tên có độ dài từ 4 đến 20 kí tự!' });
        check = false;
      } else {
        setError({ ...error, passwordRegister: '' });
      }

    }

    return check;
  }

  async function callApiPost(url, data, message, callback) {
    try {
      setLoading(true);
      const response = await User.post(url, data);
      console.log('data', data, response)
      setLoading(false);

      if (response.data.results) {
        callback(response.data.results.object);
      } else {
        callback();
      }


      toast.success(message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.log({ error });
      setLoading(false);
      let message = 'Some thing wrong!';
      if (error.response && error.response.data && error.response.data.message) message = error.response.data.message;
      toast.error(message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    }
  }

  async function handleSubmit(event, type) {
    event.preventDefault();

    if (!validFormInput()) return

    let url, data;
    let message, callback = () => { };
    switch (type) {
      case 'login':
        url = `/user/login`;
        data = { email, password };
        message = "Đăng nhập thành công"
        callback = (user) => {
          signIn(user);
          closeAuthenticationModal()
        };
        break;
      case 'verify_email':
        url = `/secure/sendOTPViaMail`;
        data = { email: emailRegister };
        message = "Gửi email xác nhận thành công"
        callback = () => setMode('finish_signup');
        break;
      case 'register':
        url = `/user/register`;
        data = { activeCode: verifyCode, username: name, email: emailRegister, password: passwordRegister, role: role === 'student' ? 0 : 1 };
        message = "Đăng kí thành công"
        callback = (user) => {
          signIn(user);
          closeAuthenticationModal()
        };
        break;
      default:
        return;
    }

    callApiPost(url, data, message, callback);
  }

  function renderFillInfoForm() {
    return (
      <div className='popup-form'>
        <form autoComplete="off" onSubmit={(e) => handleSubmit(e, 'register')}>
          <div className='form-row cf'>
            <div className='input-wrap'>
              <CssTextField
                variant="outlined"
                required
                fullWidth
                error={error.verifyCode === '' ? false : true}
                helperText={error.verifyCode}

                name='verifyCode'
                label='Nhập mã xác nhận'

                type='text'
                onChange={handleChange}
                value={verifyCode}
              />

            </div>
          </div>
          <div className='form-row cf'>
            <div className='input-wrap'>

              <CssTextField
                variant="outlined"
                required
                fullWidth
                error={error.name === '' ? false : true}
                helperText={error.name}
                name='name'
                label='Họ và tên'
                type='text'
                autoComplete="name"
                onChange={handleChange}
                value={name}
              />
            </div>
          </div>
          <div className='form-row cf'>
            <div className='input-wrap'>
              <CssTextField
                variant="outlined"
                required
                fullWidth
                error={error.passwordRegister === '' ? false : true}
                helperText={error.passwordRegister}
                name='passwordRegister'
                label='Nhập mật khẩu mới'
                type='password'
                autoComplete="new-password"
                onChange={handleChange}
                value={passwordRegister}
              />

            </div>
          </div>

          <div className='form-row-buttons btns-custom'>
            <p>Tôi muốn:</p>
            <div className="d-flex">
              <button
                type="button" onClick={() => setRole('student')}
                className={"btn btn-white " + (role === 'student' ? 'active' : '')}>Thuê gia sư</button>
              <button
                type="button" onClick={() => setRole('teacher')}
                className={"btn btn-white " + (role === 'teacher' ? 'active' : '')}>Làm gia sư</button>
            </div>
          </div>

          <div className='form-row-buttons cf'>
            <button
              className='btn-lrg-standard fullwidth mb-4'
              id='login-btn'
              name='commit'
              tabIndex='4'
              type='submit'
              disabled={loading}
            >
              {!loading ? 'Tạo tài khoản' : (
                <div className="spinner-border text-light" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </button>
          </div>
        </form>
        <footer>
          <div className='message'>
            Nhập email khác
             <div
              onClick={() => setMode("signup")}
              className='js-open-popup-join ml-2'
            >
              Quay lại
                          </div>
          </div>
        </footer>
      </div>
    )
  }

  function renderLoginForm() {
    return (
      <>

        <div className='social-signing'>
          <FacebookLogin
            appId='742881169550243'
            cssClass='btn btn__facebook'
            textButton='Đăng nhập với Facebook'
            fields='name,email,picture'
            callback={responseFacebook}
          />

          <GoogleLogin
            clientId='872347619550-vrgvvaalebncmo39f5o7mv3kehihl4fo.apps.googleusercontent.com'
            render={renderProps => (
              <button
                className='btn btn__google'
                onClick={renderProps.onClick}
              >
                Đăng nhập với Google
                          </button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
          <div className='divider'>
            <span>or</span>
          </div>
        </div>


        <div className='popup-form'>
          {mode === "login" && (
            <form onSubmit={(e) => handleSubmit(e, 'login')}>
              <div className='form-row cf'>
                <div className='input-wrap'>
                  <CssTextField
                    variant="outlined"
                    required
                    fullWidth
                    name='email'
                    label='Enter your email'
                    error={error.email === '' ? false : true}
                    helperText={error.email}
                    type="email"
                    onChange={handleChange}
                    value={email}
                  />
                </div>
              </div>
              <div className='form-row cf'>
                <div className='input-wrap'>
                  <CssTextField
                    variant="outlined"
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    error={error.password === '' ? false : true}
                    helperText={error.password}
                    onChange={handleChange}
                    value={password}
                  />
                </div>
              </div>
              <div className='form-row-buttons cf'>
                <button
                  className='btn-lrg-standard fullwidth'
                  id='login-btn'
                  name='commit'
                  tabIndex='4'
                  type='submit'
                  disabled={loading}
                >
                  {!loading ? 'Đăng nhập' : (
                    <div className="spinner-border text-light" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  )}
                </button>
              </div>
              <div className='form-row pt-3 '>
                <label>
                  <input
                    type='checkbox'
                    defaultChecked
                    name='remember'
                  />{" "}
                  Lưu thông tin đăng nhập
                            </label>

                <span className='toggle-forgot-pwd rf'>
                  <a
                    className='js-btn-forgotpw'
                    href='/reset_password'
                    rel='nofollow'
                  >
                    Quên mật khẩu
                              </a>
                </span>
              </div>
            </form>
          )}
          {mode === "signup" && (
            <form onSubmit={(e) => handleSubmit(e, 'verify_email')}>
              <div className='form-row cf'>
                <div className='input-wrap'>
                  <CssTextField
                    variant="outlined"
                    required
                    fullWidth
                    error={error.emailRegister === '' ? false : true}
                    helperText={error.emailRegister}
                    name='emailRegister'
                    label='Nhập email của bạn'
                    type='text'
                    onChange={handleChange}
                    value={emailRegister}
                  />


                </div>
              </div>
              <div className='form-row-buttons cf'>
                <button
                  className='btn-lrg-standard fullwidth'
                  id='login-btn'
                  name='commit'
                  tabIndex='4'
                  type='submit'
                  disabled={loading}
                >
                  {!loading ? 'Tiếp tục' : (
                    <div className="spinner-border text-light" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  )}
                </button>
              </div>
            </form>
          )}

          <footer>
            <div className='message'>

              {mode === 'login' ? (
                <>
                  Chưa có tài khoản
             <div
                    onClick={() => setMode("signup")}
                    className='js-open-popup-join ml-2'
                  >
                    Đăng kí ngay
                          </div>
                </>) : (<>
                  Đã có tài khoản<div
                    onClick={() => setMode("login")}
                    className='js-open-popup-join ml-2'
                  >
                    Đăng nhập ngay
                          </div></>)}

            </div>
          </footer>
        </div>
      </>
    )
  }


  return (
    <div className='static-modal'>
      <Dialog open={toggle} onClose={handleClose} className="modal-login">

        <div className='card card-login'>
          <div className='popup-content-login'>
            <div className='main-message'>
              {mode !== "finish_signup" ? (<h5>{mode === "login" ? "Đăng nhập" : "Đăng kí"} vào Tutor</h5>)
                : (
                  <>
                    <h5>Điền đầy đủ thông tin để hoàn tất việc đăng kí</h5>
                    <span>{emailRegister}</span>
                  </>
                )}

            </div>
            {mode !== "finish_signup" && renderLoginForm()
            }
            {mode === 'finish_signup' &&
              renderFillInfoForm()
            }
          </div>
        </div>

      </Dialog>
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    toggle: state.authenticationModal.toggle,
    modeModal: state.authenticationModal.modeModal
  };
};

export default connect(
  mapStateToProps, {
    closeAuthenticationModal,
    signIn
  }
)(Authentication);
