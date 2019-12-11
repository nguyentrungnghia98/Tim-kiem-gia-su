import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { User } from '../../apis';
import history from '../../history';
import './TeacherInfo.scss';
import SelectOption from '../shared/SelectOption/SelectOption';
import StarRatings from 'react-star-ratings';
import { converCurrency, formatDate } from '../../utils/pipe';
import ReactPaginate from 'react-paginate';
import { withRouter } from 'react-router-dom';
import { openAuthenticationModal } from '../../modals/Authentication/AuthenticationAction';

const review = {
  name: "Fake review",
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


const TeacherInfo = (props) => {
  const [teacher, setTeacher] = useState();
  const [selectedSortOption, setSelectedSortOption] = useState(arrSortOption[0]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true)
  const limit = 5;
  const reviews = Array(10).fill(0)


  useEffect(() => {
    async function loadInfoUser() {
      const { match } = props;
      console.log(props)
      const { id } = match.params;
      try {
        setLoading(true);

        const response = await User.getItem(id);
        setTeacher(response)

        setLoading(false);
      } catch (error) {
        console.log('err', error);
        setLoading(false);
        setTeacher(null)
        User.alertError(error);
      }
    }
    loadInfoUser();
  }, [])

  function createContract() {
    if(!props.isSignedIn){
      User.alert.warn("Vui lòng đăng nhập để tiếp tục.")
      return props.openAuthenticationModal();
    }
    if (teacher._id) history.push(`/create-contract/${teacher._id}`);
  }

  function sendMessage() {
    if(!props.isSignedIn){
      User.alert.warn("Vui lòng đăng nhập để tiếp tục.")
      return props.openAuthenticationModal();
    }
  }
  function setSortOption(i) {
    setSelectedSortOption(arrSortOption[i]);
  }

  function handlePageClick(data) {
    setPage(data.selected + 1);
    console.log(data)
    // let selected = data.selected;
    // let offset = Math.ceil(selected * this.props.perPage);

    // this.setState({ offset: offset }, () => {
    //   this.loadCommentsFromServer();
    // });
  };

  function renderReviews() {
    return (
      <>
        {reviews.slice((page - 1) * limit, page * limit).map((_, index) => {
          return (
            <div className="review " key={index}>
              <div className="row no-gutters">
                <div className="col-10 review-content">
                  <h5>{review.name + " " + ((page - 1) * limit + index + 1)}</h5>
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
        <ReactPaginate
          previousLabel={'Trước'}
          nextLabel={'Tiếp'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(reviews.length / limit)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </>
    )
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
  if (!teacher) {
    return (
      <div className="page-wrapper teacher-info-container d-flex justify-content-center">
        <h5 className="mt-5"><i>Không tìm thấy người dùng</i></h5>
      </div>
    )
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
                    <img src={teacher.avatar ? teacher.avatar : "/images/avatar.png"}
                      onError={(image) => {
                        image.target.src = "/images/avatar.png";
                      }} alt="avatar" />
                  </div>
                  <div className="info-right">
                    <div className="name">{teacher.username}</div>
                    <div className="job"><i className="fas fa-map-marker-alt mr-2"></i> {teacher.address}</div>
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
              <h4 className="teacher--title">{teacher.job ? teacher.job : 'Không rõ nghề nghiệp'}</h4>
              <p className="introduction">{teacher.introduction}</p>
              <h4 className="teacher--title">Kĩ năng</h4>
              <div className="skills">
                {teacher.major && (<>
                  {teacher.major.map(({ content }, index) => {
                    return (
                      <button key={index} type="button" className="btn btn-tag">
                        {content}
                      </button>
                    )
                  })}
                </>)}

              </div>
              <div className="statistic row">
                <div className="col-3">
                  <p>{converCurrency(teacher.salaryPerHour)}đ</p>
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
                {renderReviews()}

              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-3">
          <div className="actions">
            {props.role !== 1 && (
              <>
                <button className="btn btn-primary" onClick={createContract}>Thuê ngay</button>
                <button className="btn btn-light" onClick={sendMessage}><i className="far fa-paper-plane mr-2" />Nhắn tin</button>
                <button className="btn btn-light"><i className="far fa-heart mr-2" />  Save</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    role: state.auth.user ? state.auth.user.role : -1,
    isSignedIn: state.auth.isSignedIn
  };
};

const tmp = withRouter(TeacherInfo);
export default connect(
  mapStateToProps,{
    openAuthenticationModal
  }
)(tmp);
