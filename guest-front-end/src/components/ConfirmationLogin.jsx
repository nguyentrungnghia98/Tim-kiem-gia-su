import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { confirmable } from "react-confirm";
import confirmRegister from "../utils/confirmRegister";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";

function openRegisterModal(props) {
  props.cancel();
  confirmRegister();
}

const Confirmation = props => {
  const {
    okLabel = "Đăng nhập",
    show,
    proceed,
    dismiss,
    enableEscape = true
  } = props;

  const [loadingSocial, setLoadingSocial] = useState(false);
  const [mode, setMode] = useState("login");
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
                {mode !== "finish_signup"? (<h5>{mode ==="Login" ? "Đăng nhập" : "Đăng kí"} vào Tutor</h5>)
                : (
                  <>
                    <h5>Điền đầy đủ thông tin để hoàn tất việc đăng kí</h5>
                    <span> ntn641998@gmail.com</span>
                  </>
                )}
                  
                </div>
                {mode !== "finish_signup" && (
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
                      <div class='divider'>
                        <span>or</span>
                      </div>
                    </div>

                    <div className='popup-form'>
                      {mode ==="login" && (
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
                      {mode ==="signup" && (
                        <form>
                          <div className='form-row cf'>
                            <div className='input-wrap'>
                              <label>
                                <input
                                  className='js-form-login'
                                  maxLength='70'
                                  name='email'
                                  placeholder='Nhập email của bạn'
                                  size=''
                                  tabIndex='1'
                                  type='text'
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
                        {/* <div className='message back-to-sign-in'>
                      <a href='/login' className='js-btn-back-to-login'>
                        Back to Sign In
                      </a>
                    </div> */}

                        <p className='message'>
                          Chưa có tài khoản
                          {mode ==='login'? (<div
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
                          
                        </p>
                      </footer>
                    </div>
                  </>
                )}
                {mode === 'finish_signup' && (
                  <div className='popup-form'>
                    <form  autocomplete="off">
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
                              autocomplete="name"
                            />
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
                              placeholder='Nhập mật khẩu mới'
                              size=''
                              tabIndex='2'
                              type='password'
                              autocomplete="new-password"
                            />

                            <span className='f-label'>Password</span>
                          </label>
                        </div>
                      </div>

                      <div className='form-row-buttons btns-custom'> 
                        <p>Tôi muốn:</p>
                        <div className="d-flex">
                          <button className="btn btn-white">Thuê gia sư</button>
                          <button className="btn btn-white">Làm gia sư</button>
                        </div>
                       </div>

                      <div className='form-row-buttons cf'>
                        <input
                          className='btn-lrg-standard fullwidth mb-4'
                          id='login-btn'
                          name='commit'
                          tabIndex='4'
                          type='submit'
                          value='Tạo tài khoản'
                        />
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default confirmable(Confirmation);
