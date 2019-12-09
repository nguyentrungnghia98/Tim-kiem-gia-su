import React, { useState, useEffect } from 'react';
import { User } from '../../apis';
import history from '../../history';
import './TeacherInfo.scss';
import SelectOption from '../shared/SelectOption/SelectOption';
import StarRatings from 'react-star-ratings';
import { converCurrency, formatDate } from '../../utils/pipe';

const teacher = {
  avatar: 'https://www.upwork.com/profile-portraits/c17Ppw4ug0lV5mmvPQzWkIZ07oThUemdFLT0iTR4TOBGBCeFIIjcn36raL9f-xaJ2i',
  username: 'Trần Dần',
  email: 'a@gmail.com',
  introduction: `- Vốn là dân công nghệ Sinh học rẽ ngang sang môn Hóa, thày đã từng bước chinh phục các em 
  học sinh bằng sự tận tâm, miệt mài chia sẻ các kiến thức,sự nghiêm túc trong mọi công việc cũng 
  như sự khẳng định vị thế về chuyên môn trong cộng đồng.
  
  - Là người rất nghiêm khắc trong giảng dạy vì thế những bài giảng, bài tập của thày luôn rất cầu 
  kỳ, chỉn chu đến từng chi tiết nhỏ giúp cho các em học sinh vừa nắm được bản chất của kiến thức 
   vừa có cơ hội vận dụng vào việc xử lí nhiều dạng bài tập khác nhau.
  
  - Luôn đổi mới và đi tiên phong trong cải thiện phương pháp giảng dạy và truyền thụ kiến thức. 
  Trong mỗi bài giảng thày đều có sự ứng dụng thực tiễn để học sinh dễ dàng tiếp nhận kiến thức, 
  không còn sợ môn Hóa và củng cố tình yêu với các môn khoa học.`,
  salaryPerHour: 100000,
  address: 'Tp.Hồ Chí Minh',
  job: 'Giáo viên Toán',
  major: [
    { name: 'Toán 12' }, { name: 'Tin học' }, { name: 'React' }, { name: 'Toán' }, { name: 'Lập trình web' },
  ]
}

const review = {
  name: "Hóa học 12",
  rate: 4.2,
  date: new Date(),
  price: 1210000,
  comment: 'Thầy dạy rất nhiệt tình, tận tâm, kiến thức chuyên sâu. Rất mong học với thầy trong những khóa tiếp theo',

}

const arrSortOption = [
  { text: 'Mới nhất', code: 'newest' },
  { text: 'Đánh giá cao nhất', code: 'highest' },
  { text: 'Đánh giá thấp nhất', code: 'lowest' },
  { text: 'Số học sinh đã dạy', code: 'students' }
]


const TeacherInfo = () => {
  const { avatar, username, job, address, salaryPerHour, introduction, major, _id } = teacher;
  const [selectedSortOption, setSelectedSortOption] = useState(arrSortOption[0])
  const reviews = Array(10).fill(0)
  function setSortOption(i) {
    setSelectedSortOption(arrSortOption[i]);
  }

  return (
    <div className="page-wrapper teacher-info-container">
      <div className="row px no-gutters">
        <div className="col-12 col-lg-9">
          <div className="teacher">
            <div className="teacher-container">
              <div className="teacher-info">
                <div className="d-flex">
                  <div className="info-left">
                    <img src={avatar ? avatar : "/images/avatar.png"}
                      onError={(image) => {
                        image.target.src = "/images/avatar.png";
                      }} alt="avatar" />
                  </div>
                  <div className="info-right">
                    <div className="name">{username}</div>
                    <div className="job"><i className="fas fa-map-marker-alt mr-2"></i> {address}</div>
                  </div>
                </div>
                <div className="review">
                  <div className="section">
                    <b>100%</b>
                    <div className="divide-primary" />
                    <span>Buổi học thành công</span>
                  </div>
                  <div className="section">
                    <b>100%</b>
                    <div className="divide-primary" />
                    <span>Đánh giá tốt</span>
                  </div>
                </div>
              </div>
              <h4 className="teacher--title">{job ? job : 'Không rõ nghề nghiệp'}</h4>
              <p className="introduction">{introduction}</p>
              <h4 className="teacher--title">Kĩ năng</h4>
              <div className="skills">
                {major.map(({ name }, index) => {
                  return (
                    <button key={index} type="button" className="btn btn-tag">
                      {name}
                    </button>
                  )
                })}
              </div>
              <div className="statistic row">
                <div className="col-3">
                  <p>{converCurrency(salaryPerHour)}đ</p>
                  <span>1 giờ học</span>
                </div>
                <div className="col-3">
                  <p>100tr+</p>
                  <span>tổng thu nhập</span>
                </div>
                <div className="col-3">
                  <p>{converCurrency(1000)}đ</p>
                  <span>học viên</span>
                </div>
                <div className="col-3">
                  <p>{converCurrency(4320)}đ</p>
                  <span>giờ dạy</span>
                </div>
              </div>
            </div>
          </div>
          <div className="teacher history">
          <div className="history-container">
            <div className="history--header">
              <h5>Lịch sử dạy học và đánh giá</h5>
              <SelectOption setOption={setSortOption} selectedOption={selectedSortOption} arrOption={arrSortOption} />
            </div>
            <div className="history--body">
              {reviews.map((_, index) => {
                return (
                  <div className="review " key={index}>
                    <div className="row no-gutters">
                      <div className="col-10 review-content">
                        <h5>{review.name}</h5>
                        <div className="d-flex align-items-center review-info">
                          <StarRatings
                            starRatedColor="#ffde23"
                            rating={review.rate}
                            numberOfStars={5}
                            starDimension="16px"                            
                            name='rating'
                            starSpacing="0"
                          />
                          <div className="rating mx-3">{review.rate}</div>
                          <div className="date">{formatDate(review.date)}</div>
                        </div>
                        <span className="comment"><i>{review.comment}</i></span>
                      </div>
                      <div className="col-2 price">
                        {converCurrency(review.price)}đ
                        </div>
                    </div>
                  </div>
                )
              })}
            </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-3">
          <div className="actions">
            <button className="btn btn-primary">Thuê ngay</button>
            <button className="btn btn-light"><i className="far fa-heart mr-2" />  Save</button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherInfo;