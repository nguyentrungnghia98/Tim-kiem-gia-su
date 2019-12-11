import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import SelectOption from '../shared/SelectOption/SelectOption';
import { User } from '../../apis';
import './Messages.scss';

const arrOption = [
  { text: 'Tất cả tin nhắn', code: 'all' },
  { text: 'Tin nhắn chưa đọc', code: 'username_-1' },
  { text: 'Tin nhắn mới nhất', code: 'salaryPerHour_1' },
  { text: 'Tin nhắn cũ nhất', code: 'salaryPerHour_-1' },
]

const messages = [
  {
    user: {
      avatar: 'https://www.upwork.com/profile-portraits/c1m-NSeiQdIlI4WsEQYDEuDtVoKWhoNMFkKyK1BF-TIyOgePyEw6ysNXU5VjPCPMG-',
      username: 'Vũ Khắc Ngọc',
    }, messages: [{
      content: 'Hi there!',
      from: {
        avatar: 'https://www.upwork.com/profile-portraits/c17BYIgRrMazxmNaAEJVgAVepi5QkQ77qyyv77n3NwVLxkLgtAtxS_ad96_Z4eS_CY',
        username: 'Thị nở'
      },
      create_at: new Date("Wed Dec 11 2019 16:30:56 GMT+0700")
    }, {
      content: 'Hi there!',
      from: {
        avatar: 'https://www.upwork.com/profile-portraits/c17BYIgRrMazxmNaAEJVgAVepi5QkQ77qyyv77n3NwVLxkLgtAtxS_ad96_Z4eS_CY',
        username: 'Thị nở'
      },
      create_at: new Date()
    }]
  },
  {
    user: {
      avatar: 'https://www.upwork.com/profile-portraits/c1m-NSeiQdIlI4WsEQYDEuDtVoKWhoNMFkKyK1BF-TIyOgePyEw6ysNXU5VjPCPMG-',
      username: 'Vũ Khắc Ngọc',
    }, messages: []
  },
  {
    user: {
      avatar: 'https://www.upwork.com/profile-portraits/c1m-NSeiQdIlI4WsEQYDEuDtVoKWhoNMFkKyK1BF-TIyOgePyEw6ysNXU5VjPCPMG-',
      username: 'Vũ Khắc Ngọc',
    }, messages: []
  },
  {
    user: {
      avatar: 'https://www.upwork.com/profile-portraits/c1m-NSeiQdIlI4WsEQYDEuDtVoKWhoNMFkKyK1BF-TIyOgePyEw6ysNXU5VjPCPMG-',
      username: 'Vũ Khắc Ngọc',
    }, messages: []
  },
  {
    user: {
      avatar: 'https://www.upwork.com/profile-portraits/c1m-NSeiQdIlI4WsEQYDEuDtVoKWhoNMFkKyK1BF-TIyOgePyEw6ysNXU5VjPCPMG-',
      username: 'Vũ Khắc Ngọc',
    }, messages: []
  },
  {
    user: {
      avatar: 'https://www.upwork.com/profile-portraits/c1m-NSeiQdIlI4WsEQYDEuDtVoKWhoNMFkKyK1BF-TIyOgePyEw6ysNXU5VjPCPMG-',
      username: 'Vũ Khắc Ngọc',
    }, messages: []
  },
  {
    user: {
      avatar: 'https://www.upwork.com/profile-portraits/c1m-NSeiQdIlI4WsEQYDEuDtVoKWhoNMFkKyK1BF-TIyOgePyEw6ysNXU5VjPCPMG-',
      username: 'Vũ Khắc Ngọc',
    }, messages: []
  },
  {
    user: {
      avatar: 'https://www.upwork.com/profile-portraits/c1m-NSeiQdIlI4WsEQYDEuDtVoKWhoNMFkKyK1BF-TIyOgePyEw6ysNXU5VjPCPMG-',
      username: 'Vũ Khắc Ngọc',
    }, messages: []
  },
  {
    user: {
      avatar: 'https://www.upwork.com/profile-portraits/c1m-NSeiQdIlI4WsEQYDEuDtVoKWhoNMFkKyK1BF-TIyOgePyEw6ysNXU5VjPCPMG-',
      username: 'Vũ Khắc Ngọc',
    }, messages: []
  }
]


const Messages = (props) => {
  const [loading, setLoading] = useState(true)
  const [selectedOption, setSelectedOption] = useState(arrOption[0])
  const [openSearch, setOpenSearch] = useState(false);

  useEffect(() => {
    async function loadInfoUser() {
      const { match } = props;
      console.log(props)
      const { id } = match.params;
      try {
        setLoading(true);

        const response = await User.getItem(id);


        setLoading(false);
      } catch (error) {
        console.log('err', error);
        setLoading(false);

        User.alertError(error);
      }
    }
    //loadInfoUser();
    setLoading(false);
  }, [])

  function setOption(i) {
    setSelectedOption(arrOption[i]);
  }

  if (loading) {
    return (
      <div className="page-wrapper teacher-info-container d-flex justify-content-center">
        <div className="spinner-wrapper mt-5" >
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  function renderContactList() {
    if (messages.length === 0) return null;
    return (
      <nav className="contacts-list">
        <a href="script:0" className="contact active-contact no-style-link">
          <span className="image-container">
            <figure className="profile-image">
              <img src="" alt="m" />
              <figcaption className="font-accent">M</figcaption>
            </figure>
            <span className="online-indicator online">
              <i />
            </span>
          </span>

          <div className="user-info">
            <div className="username-container">
              <strong> mohsin789</strong>
            </div>
            <p className="text-trunc">
            <i className=""/>Lolx
            </p>
          </div>
        </a>
      </nav>
    )
  }

  function renderMessages() {
    //if(messages.length === 0)
    return (
      <div className="empty-state no-conversations">
        <strong className="font-accent">Nothing to See Here yet</strong><small>Your conversations will appear here.</small>
      </div>
    )
    // return (

    // )
  }

  return (
    <div className="page-wrapper messages">
      <div className="messages-container">
        <article className="index">
          <div className="route index-route">
            <aside className="contacts-container">
              <header>
                <div className="search-bar">
                  {!openSearch ? (
                    <>
                      <SelectOption setOption={setOption} selectedOption={selectedOption} arrOption={arrOption} />
                      <button onClick={() => setOpenSearch(true)} class="button-link search-toggle"><i class="fa fa-search" aria-hidden="true"></i></button>
                    </>
                  ) : (
                      <>
                        <div className='seach-box'>
                          <div className='search-input'>
                            <input
                              className='custom-input-text'
                              type='text'
                              placeholder='Bạn muốn học gì...'
                            />
                          </div>
                        </div>
                        <button onClick={() => setOpenSearch(false)} class="button-link search-toggle search-close">Close</button>
                      </>
                    )}

                </div>
              </header>
              {renderContactList()}
            </aside>

            {renderMessages()}


          </div>
        </article>
      </div>
    </div>
  )
}


export default Messages;