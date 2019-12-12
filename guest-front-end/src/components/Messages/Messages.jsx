import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import { formatChatDate } from '../../utils/pipe';
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
    _id: '1',
    user: {
      avatar: 'https://www.upwork.com/profile-portraits/c1m-NSeiQdIlI4WsEQYDEuDtVoKWhoNMFkKyK1BF-TIyOgePyEw6ysNXU5VjPCPMG-',
      username: 'Vũ Khắc Ngọc',
    }, messages: [{
      _id: '1',
      content: `
      Dạy hóa học lớp 12 phục vụ mục đích thi đại học. Mỗi tối 2 tiếng, bắt đầu từ 7:30PM đến 9:30PM. Kết quả nhận được:Hệ thống toàn bộ kiến thức và phương pháp giải bài tập thi THPT quốc gia. Hiểu được bản chất các hiện tượng hóa học và các quá trình phản ứng. Được tiếp cận với những phương pháp giải nhanh để xử lí các bài toán phức tạp. Được luyện tập với kho bài tập tự luyện phong phú và đa dạng. `,
      from: {
        avatar: 'https://www.upwork.com/profile-portraits/c17BYIgRrMazxmNaAEJVgAVepi5QkQ77qyyv77n3NwVLxkLgtAtxS_ad96_Z4eS_CY',
        username: 'Thị nở'
      },
      createAt: new Date("Wed Dec 11 2019 16:30:56 GMT+0700")
    }, {
      _id: '2',
      content: 'Hi there!',
      from: {
        avatar: 'https://www.upwork.com/profile-portraits/c1m-NSeiQdIlI4WsEQYDEuDtVoKWhoNMFkKyK1BF-TIyOgePyEw6ysNXU5VjPCPMG-',
        username: 'Vũ Khắc Ngọc'
      },
      createAt: new Date()
    }]
  },
  {
    _id: '2',
    user: {
      avatar: 'https://www.upwork.com/profile-portraits/c1m-NSeiQdIlI4WsEQYDEuDtVoKWhoNMFkKyK1BF-TIyOgePyEw6ysNXU5VjPCPMG-',
      username: 'Vũ Khắc Ngọc',
    }, messages: [{
      _id: '1',
      content: 'Hi there!',
      from: {
        avatar: 'https://www.upwork.com/profile-portraits/c17BYIgRrMazxmNaAEJVgAVepi5QkQ77qyyv77n3NwVLxkLgtAtxS_ad96_Z4eS_CY',
        username: 'Thị nở'
      },
      createAt: new Date("Wed Dec 11 2019 16:30:56 GMT+0700")
    }]
  },
  {
    _id: '3',
    user: {
      avatar: 'https://www.upwork.com/profile-portraits/c1m-NSeiQdIlI4WsEQYDEuDtVoKWhoNMFkKyK1BF-TIyOgePyEw6ysNXU5VjPCPMG-',
      username: 'Vũ Khắc Ngọc',
    }, messages: [{
      _id: '1',
      content: 'Hi there!',
      from: {
        avatar: 'https://www.upwork.com/profile-portraits/c17BYIgRrMazxmNaAEJVgAVepi5QkQ77qyyv77n3NwVLxkLgtAtxS_ad96_Z4eS_CY',
        username: 'Thị nở'
      },
      createAt: new Date("Wed Dec 11 2019 16:30:56 GMT+0700")
    }]
  },
  {
    _id: '4',
    user: {
      avatar: 'https://www.upwork.com/profile-portraits/c1m-NSeiQdIlI4WsEQYDEuDtVoKWhoNMFkKyK1BF-TIyOgePyEw6ysNXU5VjPCPMG-',
      username: 'Vũ Khắc Ngọc',
    }, messages: []
  },
  {
    _id: '5',
    user: {
      avatar: 'https://www.upwork.com/profile-portraits/c1m-NSeiQdIlI4WsEQYDEuDtVoKWhoNMFkKyK1BF-TIyOgePyEw6ysNXU5VjPCPMG-',
      username: 'Vũ Khắc Ngọc',
    }, messages: []
  },
  {
    _id: '6',
    user: {
      avatar: 'https://www.upwork.com/profile-portraits/c1m-NSeiQdIlI4WsEQYDEuDtVoKWhoNMFkKyK1BF-TIyOgePyEw6ysNXU5VjPCPMG-',
      username: 'Vũ Khắc Ngọc',
    }, messages: []
  },
  {
    _id: '7',
    user: {
      avatar: 'https://www.upwork.com/profile-portraits/c1m-NSeiQdIlI4WsEQYDEuDtVoKWhoNMFkKyK1BF-TIyOgePyEw6ysNXU5VjPCPMG-',
      username: 'Vũ Khắc Ngọc',
    }, messages: []
  },
  {
    _id: '8',
    user: {
      avatar: 'https://www.upwork.com/profile-portraits/c1m-NSeiQdIlI4WsEQYDEuDtVoKWhoNMFkKyK1BF-TIyOgePyEw6ysNXU5VjPCPMG-',
      username: 'Vũ Khắc Ngọc',
    }, messages: []
  },
  {
    _id: '9',
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
  const [selectedChat, setSelectedChat] = useState(messages[0]);
  const [currentTime, setCurrentTime] = useState(new Date())
  const {user} = props;

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

  useEffect(()=>{
    const interval = setInterval(()=>{
      setCurrentTime(new Date())
    }, 10*1000)

    return () => clearInterval(interval);
  })

  function setOption(i) {
    setSelectedOption(arrOption[i]);
  }

  function sendMessage(e){
    e.preventDefault();
    const rd = Math.random()*100
    const data = {
      _id: rd,
      createAt: new Date(),
      content: e.target.content.value,
      from: user
    }
    e.target.content.value = '';

    setSelectedChat({...selectedChat, messages: selectedChat.messages.concat(data)});
    setCurrentTime(new Date())
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

  function getLastMessage(messages) {
    if (messages.length === 0) return {};
    return messages[messages.length - 1];
  }

  function renderContactList() {
    if (messages.length === 0) return null;

    return (
      <nav className="contacts-list">
        {messages.map(({ _id, user, messages }, index) => {
          return (
            <a key={_id} href="script:0" className={`contact ${selectedChat._id === _id ? 'active-contact' : ''} no-style-link`}>
              <span className="image-container">
                <figure className="profile-image">
                  <img src={user.avatar}
                    onError={(image) => {
                      image.target.src = "/images/avatar.png";
                    }} alt="avatar" />
                  <figcaption className="font-accent">M</figcaption>
                </figure>
                <span className="online-indicator online">
                  <i />
                </span>
              </span>

              <div className="user-info">
                <div className="username-container">
                  <strong>{user.username}</strong>
                </div>
                <p className="text-trunc">
                  {getLastMessage(messages).content || null}
                </p>
              </div>
              <aside>
                <div className="time">
                  {getLastMessage(messages).createAt ? formatChatDate(getLastMessage(messages).createAt, currentTime) : null}
                </div>
              </aside>
            </a>
          )
        })}
      </nav>
    )
  }

  function renderMessagesList(_messages) {
    return _messages.map(({ _id, content, from, createAt }) => {
      return (
        <div key={_id} href="script:0" className="contact">
          <span className="image-container">
            <figure className="profile-image">
              <img src={from.avatar}
                onError={(image) => {
                  image.target.src = "/images/avatar.png";
                }} alt="avatar" />
              <figcaption className="font-accent">M</figcaption>
            </figure>
            <span className="online-indicator online">
              <i />
            </span>
          </span>

          <div className="user-info">
            <div className="username-container">
              <strong>{from.username}</strong>
            </div>
            <div className="message-body">
              {content}
            </div>
          </div>
          <aside>
            <div className="time">
              {formatChatDate(createAt, currentTime)}
            </div>
          </aside>
        </div>
      )
    })
  }
  function renderMessages() {
    if (messages.length === 0)
      return (
        <div className="empty-state no-conversations">
          <strong className="font-accent">Nothing to See Here yet</strong><small>Your conversations will appear here.</small>
        </div>
      )
    const { user, messages: _messages } = selectedChat;
    return (
      <div className="conversation">
        <header>
          <div className="upper-row">
            <div className="user-info">
              <h1><span className="online-indicator online"><i></i></span>
                {user.username}
              </h1>
            </div>
          </div>

          <small>
            <span>Last seen<time>8h ago</time></span>
            <span>Local time<time >Dec 11, 10:40 PM</time></span>
          </small>

        </header>
        <div className="conversation-panels">
          <div className="message-flow">
            <div className="content at-top">
            {renderMessagesList(_messages)}
            </div>    
            <form className="send-message" onSubmit={sendMessage}>
              <div className='seach-box'>
                <div className='search-input'>
                  <input
                    className='custom-input-text'
                    name="content"
                    type='text'
                    placeholder='Gửi tin nhắn'
                  />
                </div>
              </div>
              <button className="btn btn-send">Send</button>
            </form>        
          </div>
          <aside className="details-pane">
            <section className="about">
              <header><h2>About</h2></header>
              <div className="summary">
                <a href="script:0" className="profile-image-link">
                  <figure className="profile-image">
                    <img src={user.avatar}
                      onError={(image) => {
                        image.target.src = "/images/avatar.png";
                      }} alt="avatar" />
                    <figcaption className="font-accent">M</figcaption>
                  </figure></a>
                <a href="script:0" className="username">{user.username}</a>
                <div><span className="user-level">{user.job || null}</span></div>
              </div>
            </section>
          </aside>
        </div>
        
      </div>
    )
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
                      <button onClick={() => setOpenSearch(true)} className="button-link search-toggle"><i className="fa fa-search" aria-hidden="true"></i></button>
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
                        <button onClick={() => setOpenSearch(false)} className="button-link search-toggle search-close">Close</button>
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

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}
export default connect(mapStateToProps)(Messages);