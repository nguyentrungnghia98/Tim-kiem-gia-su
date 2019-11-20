import React from 'react';

import { Modal } from 'react-bootstrap'
import { confirmable } from 'react-confirm';

import confirmLogin from '../utils/confirmLogin';

function openLoginrModal(props) {
    props.cancel();
    confirmLogin();
}

const Confirmation = (props) => {
    const {
        okLabel = 'Đăng ký',
        show,
        proceed,
        dismiss,
        enableEscape = true,
    } = props;

    return (
        <div className="static-modal">
            <Modal className="modal-login" show={show} onHide={dismiss} backdrop={enableEscape ? true : 'static'} keyboard={enableEscape}>
                <div className="container-login">
                    <div className="row h-100 my-auto">
                        <div className="card card-login card-block mx-auto">
                            <div className="card-header">
                                <h3>Đăng ký</h3>
                            </div>
                            <div className="card-body">
                            <form>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-user"/></span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Tài khoản" required/>
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-file-signature"/></span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Họ tên" required/>
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-envelope"/></span>
                                    </div>
                                    <input type="email" className="form-control" placeholder="Email" required/>
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-envelope"/></span>
                                    </div>
                                    <input type="email" className="form-control" placeholder="Nhập lại email" required/>
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-key"/></span>
                                    </div>
                                    <input type="password" className="form-control" placeholder="Mật khẩu" required/>
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-key"/></span>
                                    </div>
                                    <input type="password" className="form-control" placeholder="Nhập lại mật khẩu" required/>
                                </div>
                                <div className="form-group">
                                    <button type="button" className="btn float-right login_btn" onClick={proceed}>
                                        {okLabel}
                                    </button>
                                </div>
                            </form>
                            </div>
                            <div className="card-footer">
                                <div className="d-flex justify-content-center links">
                                    Bạn đã có tài khoản?
                                    <a href="script:0" role="button" onClick={() => openLoginrModal(props)}>Đăng nhập ngay</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default confirmable(Confirmation);