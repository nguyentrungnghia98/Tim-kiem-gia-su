import React, { useState, useEffect } from "react";
import {User} from '../../apis';
import { connect } from 'react-redux';
import { closeModal } from './SendMessageAction';
import './SendMessage.scss';
import {
  Dialog,TextareaAutosize
} from '@material-ui/core';

const SendMessageModal = props => {
  const {
    toggle,
    closeModal,
    user
  } = props;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [props.toggle])

  function handleClose() {
    closeModal();
  }

  async function handleSubmit(event, type) {
    event.preventDefault();
    
    try {
      setLoading(true);
      // const response = await User.post(url,data, {
      //   headers: { authorization : userToken }
      // });
    
      setLoading(false);
      closeModal();
      User.alert.success(event.target.content.value);
    } catch (error) {
      setLoading(false);
      User.alertError(error);
    }
  }

  function renderSendMessageForm() {
    return (
      <div className='popup-form'>
        <form autoComplete="off" onSubmit={handleSubmit}>

          <div className='form-row-buttons d-flex'>
          <TextareaAutosize
                      variant="outlined"
                      rows="6"                      
                      placeholder="Nhập nội dung tin nhắn..."
                      className='textarea-custom w-100'
                      name="content"
                      required
                    /> 
          </div>

          <div className='form-row-buttons mt-3 mb-4 text-right'>
            <button
              className='btn btn-primary'
              name='commit'
              type='submit'
              disabled={loading}
            >
              Gửi
            </button>
          </div>
        </form>

      </div>
    )
  }


  return (
    <div className='static-modal'>
      <Dialog open={toggle} onClose={handleClose} className="modal-login send-message-1">

        <div className='card card-login'>
          <div className='popup-content-login'>
            <div className='main-message'>
              <h5>Gửi tin nhắn</h5>
            </div>
            {renderSendMessageForm()}
          </div>
        </div>

      </Dialog>
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    toggle: state.sendMessageModal,
    user: state.auth.user,
  };
};

export default connect(
  mapStateToProps, {
    closeModal    
  }
)(SendMessageModal);
