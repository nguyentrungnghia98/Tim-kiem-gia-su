import React, { useState,useEffect } from "react";
import { Modal } from "react-bootstrap";
import { confirmable } from "react-confirm";
import confirmRegister from "../utils/confirmRegister";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import User from '../apis/user';

function openRegisterModal(props) {
  props.cancel();
  confirmRegister();
}

const Confirmation = props => {
  const {
    show,
    dismiss,
    enableEscape = true,
    confirmation,
    mode: initalMode
  } = props;
  console.log('mode', confirmation)
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [loadingSocial, setLoadingSocial] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailRegister, setEmailRegister] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');
  const [role, setRole] = useState('student');
  const [mode, setMode] = useState(confirmation);



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
    }
  }



  function responseFacebook(response) {
    console.log(response);
    const data = {
      email: response.email,
      name: response.name,
      facebookId: response.id,
      provider: "facebook"
    };
    //handleLoginSocial(data);
  }

  function responseGoogle(response) {
    console.log(response);
    const data = {
      email: response.profileObj.email,
      name: response.profileObj.name,
      provider: "google",
      googleId: response.googleId
    };
    //handleLoginSocial(data);
  }

  async function handleSubmitRegister(event) {
    event.preventDefault();
    // if (validFormInput()) {
    //   //call api
    //   callApi();
    // }
    try {
      setLoadingRegister(true);
      const url = `/user/register`;
      const data = { username: name, email: emailRegister, password: passwordRegister, role: role === 'student' };
      console.log('data',data)
      const response = await User.post(url, data);
      setLoadingRegister(false);
      //signIn(response.data);

    } catch (error) {
      console.log({ error });
      setLoadingRegister(false);
      // let message = 'Register failed!';
      // if (error.response.data.message) message = error.response.data.message;
      // openAlertError('Failed', message);
    }
  }

  function renderFillInfoForm() {
    return (
      <div className='popup-form'>
        <form autoComplete="off"  onSubmit={handleSubmitRegister}>
          <div className='form-row cf'>
            <div className='input-wrap'>
              <label>
                <input
                  className='js-form-login'
                  maxLength='70'
                  name='name'
                  placeholder='Họ và tên'
                  size=''
                  tabIndex='1'
                  type='text'
                  autoComplete="name"
                  onChange={handleChange}
                  value={name}
                />
              </label>
            </div>
          </div>
          <div className='form-row cf'>
            <div className='input-wrap'>
              <label>
                <input
                  className='js-form-password'
                  name='passwordRegister'
                  placeholder='Nhập mật khẩu mới'
                  size=''
                  tabIndex='2'
                  type='password'
                  autoComplete="new-password"
                  onChange={handleChange}
                  value={passwordRegister}
                />

                <span className='f-label'>Password</span>
              </label>
            </div>
          </div>

          <div className='form-row-buttons btns-custom'>
            <p>Tôi muốn:</p>
            <div className="d-flex">
              <button 
              type="button" onClick={()=> setRole('student')}
              className={"btn btn-white " + (role==='student'?'active':'')}>Thuê gia sư</button>
              <button 
              type="button" onClick={()=> setRole('teacher')}
              className={"btn btn-white "+ (role==='teacher'?'active':'')}>Làm gia sư</button>
            </div>
          </div>

          <div className='form-row-buttons cf'>
            <button
              className='btn-lrg-standard fullwidth mb-4'
              id='login-btn'
              name='commit'
              tabIndex='4'
              type='submit'
            >
              {!loadingRegister?'Tạo tài khoản': (
                <div className="spinner-border text-light" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              )}
            </button>
          </div>
        </form>
      </div>
    )
  }

  function renderLoginForm() {
    return (
      <>
        <div className='social-signing'>
          <FacebookLogin
            appId='463259067622314'
            cssClass='btn btn__facebook'
            textButton='Đăng nhập với Facebook'
            fields='name,email,picture'
            callback={responseFacebook}
            isDisabled={loadingSocial}
          />

          <GoogleLogin
            clientId='539505129187-ljgthsrvlg6l9h66v1o4kuatelduv6bv.apps.googleusercontent.com'
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
            disabled={loadingSocial}
          />
          <div className='divider'>
            <span>or</span>
          </div>
        </div>

        <div className='popup-form'>
          {mode === "login" && (
            <form>
              <div className='form-row cf'>
                <div className='input-wrap'>
                  <label>
                    <input
                      className='js-form-login'
                      id='user_session_login'
                      maxLength='70'
                      name='user_session[login]'
                      placeholder='Email / Username'
                      size=''
                      tabIndex='1'
                      type='text'
                    />

                    <span className='f-label'>
                      Email / Username
                                </span>
                  </label>
                </div>
              </div>
              <div className='form-row cf'>
                <div className='input-wrap'>
                  <label>
                    <input
                      className='js-form-password'
                      id='user_session_password'
                      name='user_session[password]'
                      placeholder='Password'
                      size=''
                      tabIndex='2'
                      type='password'
                    />

                    <span className='f-label'>Password</span>
                  </label>
                </div>
              </div>
              <div className='form-row-buttons cf'>
                <input
                  className='btn-lrg-standard fullwidth'
                  id='login-btn'
                  name='commit'
                  tabIndex='4'
                  type='submit'
                  value='Đăng nhập'
                />
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
            <form>
              <div className='form-row cf'>
                <div className='input-wrap'>
                  <label>
                    <input
                      className='js-form-login'
                      maxLength='70'
                      name='emailRegister'
                      placeholder='Nhập email của bạn'
                      size=''
                      tabIndex='1'
                      type='text'
                      onChange={handleChange}
                      value={emailRegister}
                    />

                    <span className='f-label'>
                      Nhập email của bạn
                                </span>
                  </label>
                </div>
              </div>
              <div className='form-row-buttons cf'>
                <input
                  className='btn-lrg-standard fullwidth'
                  id='login-btn'
                  name='commit'
                  tabIndex='4'
                  type='button'
                  value='Tiếp tục'
                  onClick={() => setMode('finish_signup')}
                />
              </div>
            </form>
          )}

          <footer>

            <a className='message'>
              Chưa có tài khoản
                          {mode === 'login' ? (<div
                onClick={() => setMode("signup")}
                className='js-open-popup-join ml-2'
              >
                Đăng kí ngay
                          </div>) : (<div
                  onClick={() => setMode("login")}
                  className='js-open-popup-join ml-2'
                >
                  Đăng nhập ngay
                          </div>)}

            </a>
          </footer>
        </div>
      </>
    )
  }


  return (
    <div className='static-modal'>
      <Modal
        className='modal-login'
        show={show}
        onHide={dismiss}
        backdrop={enableEscape ? true : "static"}
        keyboard={enableEscape}
      >
        <div className='container-login'>
          <div className='row h-100 my-auto'>
            <div className='card card-login card-block mx-auto'>
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
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default confirmable(Confirmation);
