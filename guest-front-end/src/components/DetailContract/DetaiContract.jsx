import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { User } from '../../apis';
import history from '../../history';
import './DetailContract.scss';
import { TextField, TextareaAutosize } from '@material-ui/core';
import { converCurrency } from '../../utils/pipe';
import StarRatings from 'react-star-ratings';


const contract = {
  teacher: {
    avatar: 'https://www.upwork.com/profile-portraits/c1m-NSeiQdIlI4WsEQYDEuDtVoKWhoNMFkKyK1BF-TIyOgePyEw6ysNXU5VjPCPMG-',
    username: 'Vũ Khắc Ngọc',
    job: 'Giáo viên hóa học'
  },
  student: {
    avatar: 'https://www.upwork.com/profile-portraits/c17BYIgRrMazxmNaAEJVgAVepi5QkQ77qyyv77n3NwVLxkLgtAtxS_ad96_Z4eS_CY',
    username: 'Thị nở',
    job: 'THPT Lê Hồng Phon'
  },
  name: 'Dạy hóa học 12 vào tối T5,T6,T7',
  salaryPerHour: 100000,
  totalHour: 6,
  description: 'Dạy hóa học lớp 12 phục vụ mục đích thi đại học. Mỗi tối 2 tiếng, bắt đầu từ 7:30PM đến 9:30PM'
}
const DetailContract = (props) => {
  const [loading, setLoading] = useState(false)
  const { teacher, student, name, salaryPerHour, totalHour, description } = contract;
  const [reviewContent, setReviewContent] = useState('');
  const [rating, setRating] = useState(5);

  useEffect(() => {
    async function loadInfoUser() {
      const { match } = props;
      console.log(props)
      const { id } = match.params;
      try {
        setLoading(true);

        const response = await User.getItem(id);
        //setTeacher(response)
        //setSalaryPerHour(response.salaryPerHour)
        setLoading(false);
      } catch (error) {
        console.log('err', error);
        setLoading(false);
        //setTeacher(null)
        User.alertError(error);
      }
    }
    //loadInfoUser();
  }, [])

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
  if (!contract) {
    return (
      <div className="page-wrapper teacher-info-container d-flex justify-content-center">
        <h5 className="mt-5"><i>Không tìm thấy hợp đồng</i></h5>
      </div>
    )
  }

  function renderContractInfo() {
    return (
      <div className="teacher custom-card">
        <div className="custom-card-container">
          <div className="custom-card--header teacher">
            <div className="row w-100">
              <div className="col-6 d-flex">
                <img src={teacher.avatar ? teacher.avatar : "/images/avatar.png"}
                  onError={(image) => {
                    image.target.src = "/images/avatar.png";
                  }} alt="avatar" />
                <div className="teacher-info">
                  <h5>{teacher.username}</h5>
                  <span>{teacher.job || 'Không rõ'}</span>
                  <span className="text-primary"><i>Gia sư</i></span>
                </div>
              </div>
              <div className="col-6 d-flex">
                <img src={student.avatar ? student.avatar : "/images/avatar.png"}
                  onError={(image) => {
                    image.target.src = "/images/avatar.png";
                  }} alt="avatar" />
                <div className="teacher-info">
                  <h5>{student.username}</h5>
                  <span>{student.job || 'Không rõ'}</span>
                  <span className="text-primary"><i>Học sinh</i></span>
                </div>
              </div>
            </div>


          </div>
          <div className="custom-card--body">
            <div className="form-field">
              <h4 className="">
                {contract.name}
              </h4>
            </div>
            <div className="form-field">
              <label className="text-label">
                Giá tiền cho 1 giờ
                  </label>
              <div className="flex-row-center">
                <TextField
                  variant="outlined"
                  placeholder="Ví dụ: 100000"
                  className='w-40 mr-3'
                  value={salaryPerHour}
                  readOnly
                  required
                />
                <span>/hr</span>
              </div>
              <span className="ml-2">Giá gia sư yêu cầu là <b>{converCurrency(teacher.salaryPerHour)}đ</b></span>
            </div>
            <div className="form-field">
              <label className="text-label">
                Số giờ thuê
                  </label>
              <div className="flex-row-center">
                <TextField
                  variant="outlined"
                  placeholder="Ví dụ: 1"
                  className='w-40 mr-3'
                  value={totalHour}
                  readOnly
                  required
                />
                <span>giờ</span>
              </div>
            </div>
            <div className="form-field">
              <div>=>  Tổng tiền: <b>{converCurrency(totalHour * salaryPerHour)}đ</b></div>
            </div>

            <div className="form-field">
              <label className="text-label">
                Mô tả công việc
                  </label>
              <TextareaAutosize
                variant="outlined"
                rows="6"
                placeholder="Nhập mô tả hợp đồng ví dự lịch học, môn học, ..."
                className='textarea-custom'
                value={description}
                readOnly
                required
              />
            </div>
            <div className="form-field">
              <label className="text-label">
                Mô tả công việc
                  </label>
              <div className="text-warning">
                Chúng tôi đang trong giai đoạn thử nghiệm, bạn có thể bỏ thông tin này
                  </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
  function renderContractReview() {
    return (
      <div className="teacher custom-card">
        <div className="custom-card-container">
          <div className="custom-card--header teacher">
            
            <h5>Đánh giá và nhận xét</h5>
          </div>
 
          <div className="custom-card--body">
            <div className="form-field">
              <div className="d-flex mb-4 align-items-center">
                <p className="mr-4 my-0">Đánh giá của bạn về chất lượng giảng dạy của gia sư:</p>
                <StarRatings
                      starRatedColor="#ffde23"
                      rating={rating}
                      numberOfStars={5}
                      changeRating={(value)=> setRating(value)}
                      starDimension="16px"
                      name='rating'
                      starSpacing="0"
                    />
              </div>

              <p>Viết nhận xét của bạn vào bên dưới</p>
              <TextareaAutosize
                variant="outlined"
                rows="6"
                placeholder="Nhận xét của bạn về hợp đồng này..."
                className='textarea-custom'
                value={reviewContent}
                onChange={e => setReviewContent(e.target.value)}
                readOnly
                required
              />

              <button className="btn btn-primary mt-4 w-30 ml-auto">
                Đánh giá
              </button>
            </div>
          </div>
        </div>
      </div>
    )   
  }
  function renderActionContract() {
    return (
      <>
      <div className="custom-card">
        <div className="custom-card-container">
          <div className="custom-card--body">
            <div className="form-field align-items-center">
              <h5>Trạng thái</h5>
              <span className="text-warning mt-3">
                Gia sư chưa xác nhận
                  </span>
              <button className="btn btn-primary mt-4">
                Hủy hợp đồng
                  </button>
            </div>
          </div>
        </div>
      </div>
      <div className="custom-card mt-3">
        <div className="custom-card-container">
          <div className="custom-card--body">
            <div className="form-field align-items-center">
              <h5>Trạng thái</h5>
              <span className="text-success mt-3">
                Đã thanh toán.          
                  </span>
                  <span className="text-success ">Đang trong quá trình học</span>
              <button className="btn btn-danger mt-4">
                Khiếu nại hợp đồng
                  </button>
                  <button className="btn btn-danger mt-3">
                Chấm dứt hợp đồng
                  </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="custom-card mt-3">
        <div className="custom-card-container">
          <div className="custom-card--body">
            <div className="form-field align-items-center">
              <h5>Trạng thái</h5>
              <span className="text-danger mt-3">
                Học sinh đã khiếu nại.  
                  </span>
                  <span className="text-danger text-center">Đang trong quá trình giải quyết</span>             
            </div>
          </div>
        </div>
      </div>

      <div className="custom-card mt-3">
        <div className="custom-card-container">
          <div className="custom-card--body">
            <div className="form-field align-items-center">
              <h5>Trạng thái</h5>
              <span className="text-success text-center mt-3">
                Học sinh khiếu nại thành công  
                  </span>                          
            </div>
          </div>
        </div>
      </div>

      <div className="custom-card mt-3">
        <div className="custom-card-container">
          <div className="custom-card--body">
            <div className="form-field align-items-center">
              <h5>Trạng thái</h5>
              <span className="text-success text-center mt-3">
                Hợp đồng kết thúc thành công
                  </span>                          
            </div>
          </div>
        </div>
      </div>
      </>
    )
  }
  return (
    <div className="page-wrapper">
      <div className="contract-detail-container">
        <h4 className="ml-5">Thông tin hợp đồng</h4>
        <div className="row">
          <div className="col-9">
            {renderContractInfo()}
            {renderContractReview()}
          </div>
          <div className="col-3">
            <div className="mt-3">
              {renderActionContract()}
            </div>

          </div>
        </div>

      </div>

    </div>
  )
}

export default withRouter(DetailContract);