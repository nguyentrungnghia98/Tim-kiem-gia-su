import React from "react";
import './Teacher.scss';
// const teacher = {
//   avatar: '',
//   username: '',
//   email: '',
//   salaryPerHour: 25,
//   address: 'Tp.Hồ Chí Minh',
//   job: 'Giáo viên Toán',
//   skills: [
//     {name: 'Toán 12'},{name: 'Tin học'},{name: 'React'},{name: 'Toán'},{name: 'Lập trình web'},
//   ]
// }
function converCurrency(money) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
  });
  return formatter.format(money).slice(1);
}
const Teacher = (props) => {
  const { avatar, username, job, address, salaryPerHour, skills } = props.data;
  return (
    <div className="teacher">
      <div className="teacher-container">
        <div className="teacher-info">
          <div className="info-left">
            <img src={avatar}
              onError={(image) => {
                image.target.src = "/images/avatar.png";
              }} alt="avatar" />
          </div>
          <div className="info-right">
            <div className="name">{username}</div>
            <div className="job">{job}</div>
          </div>
        </div>
        <div className="sub-info">
          <div className="salary"><b>{converCurrency(salaryPerHour)}đ</b>/h</div>
          <div className="address">{address}</div>
        </div>
        <div className="divide"></div>
        <div className="skills">
          {skills.map(({name},index) => {
            return (
              <button key={index} type="button" className="btn btn-tag">
                {name}
              </button>
            )
          })}
        </div>
        <div className="btn btn-primary">
          Thông tin chi tiết
        </div>
      </div>
    </div>
  )
}

export default Teacher;