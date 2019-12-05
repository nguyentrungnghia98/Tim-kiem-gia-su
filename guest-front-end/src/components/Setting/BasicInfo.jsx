import React, { useState, useEffect, useRef } from 'react';
import {
  CircularProgress
} from '@material-ui/core';
import CssTextField from './CssTextField';
import Imgur from '../../apis/imgur';

const BasicInfo = (props) => {
  const { user, fetchUser, openAlertError, onSubmit } = props;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [loadSaveDone, setLoadSaveDone] = useState(true);
  const [loadImageDone, setLoadImageDone] = useState(true);
  const fileInput = useRef(null);

  async function getUrlImage(formData) {
    const clientId = '4f3c3547ebbfe10';
    let url = '';
    try {
      setLoadImageDone(false);
      const response = await Imgur.post('', formData, {
        headers: {
          Authorization: 'Client-ID ' + clientId
        }
      });
      console.log(response);
      url = response.data.data.link;
      setImgUrl(url);
      setLoadImageDone(true);
    } catch (err) {
      console.log({ err });
      setLoadImageDone(true);
      return openAlertError('Failed', 'Get url image failed!');
    }

  }

  function handleFileChange(event) {
    const current = fileInput.current;
    const files = current.files;
    if (!files.length) {
      return openAlertError('Error', 'Please select file!');
    }
    const formData = new FormData();
    formData.append('image', files[0]);
    console.log('file', files);
    getUrlImage(formData);
  }

  function handleInfoSubmit(e) {
    e.preventDefault();
    const data = {
      name,
      avatar: imgUrl,
      address,
      description
    };
    console.log('info', data);
    //onSubmit(data);
  }

  return (
    <form onSubmit={handleInfoSubmit} className="setting-form basic-info">
      <h4>Thông tin cơ bản</h4>
      <div className="d-flex justify-content-center mt-4 mb-2">
      <div className="image-wrapper">
        {!loadImageDone ? (
          <CircularProgress className="image-spinner" size={30} />
        ) : (
            <div className="uploadOverlay">
              <i className="fas fa-cloud-upload-alt"></i>
              <input
                type="file"
                className="uploadImage"
                ref={fileInput}
                onChange={handleFileChange}
              />
            </div>
          )}
        <img src={imgUrl}
          className={!loadImageDone ? 'opacity-spinner' : ''}
          onError={(image) => {
            image.target.src = "/images/avatar.png";
          }} alt="avatar" />
      </div>
      </div>
      <label className="text-label">
        Họ và tên
              </label>
      <CssTextField
        variant="outlined"
        placeholder="Ví dụ: Nguyễn Văn A"
        className=''
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <label className="text-label">
        Địa chỉ
              </label>
      <CssTextField
        className=''
        placeholder="Ví dụ: Tp. Hồ Chí Minh"
        variant="outlined"
        margin="normal"
        value={address}
        onChange={e => setAddress(e.target.value)}
      />
      <label className="text-label">
        Bài tự giới thiệu
              </label>
      <CssTextField
        rows="6"
        multiline
        placeholder="Ví dụ tôi là giáo viên A có kinh nghiệm dạy tại trường ..."
        variant="outlined"
        margin="normal"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <div className="actions">
        <button className="btn btn-primary">
          {loadSaveDone ? (
            'Cập nhật'
          ) : (
              <CircularProgress size={26} />
            )}
        </button>
      </div>
    </form>
  )
}

export default BasicInfo;