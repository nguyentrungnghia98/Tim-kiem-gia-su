import React, { useState, useEffect } from 'react';
import {

  CircularProgress
} from '@material-ui/core';
import CssTextField from './CssTextField';

const ChangePassword = (props) => {
  const { fetchUser, openAlertError, onSubmit } = props;
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loadSaveDone, setLoadSaveDone] = useState(true);
  const [disableButton, setDisableButton] = useState(true);

  function handlePasswordSubmit(e) {
    e.preventDefault();
    const data = {
      password,
      newPassword
    };
    console.log('password', data);
    onSubmit(data);
  }

  return (
    <form onSubmit={handlePasswordSubmit} className="setting-form">
      <h4>Thông tin cơ bản</h4>
      <label className="text-label">
        Mật khẩu hiện tại
              </label>
      <CssTextField
        className=''
        variant="outlined"
        placeholder="Nhập mật khẩu hiện tại"
        margin="normal"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <label className="text-label">
        Mật khẩu mới
              </label>
      <CssTextField
        className=''
        variant="outlined"
        placeholder="Nhập mật khẩu mới"
        margin="normal"
        type="password"
        value={newPassword}
        onChange={e => {
          setNewPassword(e.target.value);
          if (e.target.value !== confirmPassword) {
            setDisableButton(true);
          } else {
            setDisableButton(false);
          }
        }}
        required
      />
      <label className="text-label">
        Nhập lại mật khẩu mới
              </label>
      <CssTextField
        className=''
        variant="outlined"
        placeholder="Nhập lại mật khẩu mới"
        margin="normal"
        value={confirmPassword}
        type="password"
        onChange={e => {
          setConfirmPassword(e.target.value);
          if (e.target.value !== newPassword) {
            setDisableButton(true);
          } else {
            setDisableButton(false);
          }
        }}
      />
      <div className="actions">
        <button className="btn btn-primary" disabled={disableButton}>
          {loadSaveDone ? (
            'Save changes'
          ) : (
              <CircularProgress size={26} />
            )}
        </button>
      </div>
    </form>
  )
}

export default ChangePassword;