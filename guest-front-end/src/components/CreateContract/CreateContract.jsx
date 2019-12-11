import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { User } from '../../apis';
import history from '../../history';
import './CreateContract.scss';
import {TextField, TextareaAutosize } from '@material-ui/core';
import { converCurrency } from '../../utils/pipe';
const CreateContract = (props) => {
  const [teacher, setTeacher] = useState();
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('');
  const [salaryPerHour, setSalaryPerHour] = useState(0);
  const [totalHour, setTotalHour] = useState(1);
  const [description, setDescription] = useState('');
  const [isCheck, setIsCheck] = useState(true);

  
  useEffect(() => {
    async function loadInfoUser() {
      const { match } = props;
      console.log(props)
      const { id } = match.params;
      try {
        setLoading(true);

        const response = await User.getItem(id);
        setTeacher(response)
        setSalaryPerHour(response.salaryPerHour)
        setLoading(false);
      } catch (error) {
        console.log('err', error);
        setLoading(false);
        setTeacher(null)
        User.alertError(error);
      }
    }
    if(props.role === 0) loadInfoUser();
  }, [])

  if(props.role !== 0){
    return (
      <div className="page-wrapper text-center">        
          <h5 className="mt-5">
            <i>Chúng tôi không hỗ trợ thuê gia sư nếu bạn đã là gia sư.<br/> Vui lòng tạo tài khoản khác với vai trò là học sinh</i>
          </h5>        
      </div>
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
        <h5 className="mt-5"><i>Không tìm thấy giáo viên</i></h5>
      </div>
    )
  }

  function handleSubmit(e) {
    e.preventDefault();
    history.push(`/contract`);
  }
  console.log('value', teacher, salaryPerHour)
  return (
    <div className="page-wrapper">
      <div className="contract-container">
        <h4 className="ml-5">Thuê gia sư</h4>
        <form onSubmit={handleSubmit}>
          <div className="teacher custom-card">
            <div className="custom-card-container">
              <div className="custom-card--header teacher">
                <img src={teacher.avatar ? teacher.avatar : "/images/avatar.png"}
                  onError={(image) => {
                    image.target.src = "/images/avatar.png";
                  }} alt="avatar" />
                <div className="teacher-info">
                  <h5>{teacher.username}</h5>
                  <span>{teacher.job || 'Không rõ'}</span>
                </div>

              </div>
              <div className="custom-card--body">
                <div className="form-field">
                  <label className="text-label">
                    Tên hợp đồng
              </label>
                  <TextField
                    variant="outlined"
                    placeholder="Ví dụ: Dạy hóa 12 vào T3,T5"
                    className='w-60'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="teacher custom-card">
            <div className="custom-card-container">
              <div className="custom-card--header">
                <h5>Điều khoản</h5>
              </div>
              <div className="custom-card--body">
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
                      onChange={e => setSalaryPerHour(e.target.value)}
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
                      onChange={e => setTotalHour(e.target.value)}
                      required
                    />
                    <span>giờ</span>
                  </div>                 
                </div>
                <div className="form-field">
                  <div>=>  Tổng tiền: <b>{converCurrency(totalHour*salaryPerHour)}đ</b></div>
                </div>
              </div>
            </div>
          </div>

          
          <div className="teacher custom-card">
            <div className="custom-card-container">
              <div className="custom-card--header">
                <h5>Mô tả công việc</h5>
              </div>
              <div className="custom-card--body">

                <div className="form-field">                  
                    <TextareaAutosize
                      variant="outlined"
                      rows="6"                      
                      placeholder="Nhập mô tả hợp đồng ví dự lịch học, môn học, ..."
                      className='textarea-custom'
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      required
                    />           
                </div>
              </div>
            </div>
          </div>

          <div className="teacher custom-card">
            <div className="custom-card-container">
              <div className="custom-card--header">
                <h5>Phương thức thanh toán</h5>
              </div>
              <div className="custom-card--body">
                
                <div className="form-field">
                <span className="ml-1">
                  Bạn sẽ trả thêm phí tương ứng với phương thức thanh toán
                </span>
                <button type="button" className="btn btn-primary w-30 mt-3 mb-4">
                  Thêm phương thức thanh toán
                </button>

                  <div className="text-warning">
                    Chúng tôi đang trong giai đoạn thử nghiệm, bạn có thể bỏ qua bước này
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="teacher custom-card">
            <div className="custom-card-container">
              <div className="custom-card--body">
                <div className="form-field">   
                  
                  <div className="flex-row-center">
                  <input type="checkbox" className="mr-2" name="vehicle1" checked={isCheck} onChange={e => setIsCheck(e.target.checked)}/> 
                   <span> Có, tôi đã đọc và đồng ý với <a href="script:0"> điều khoản </a> của công ty</span>
                  </div>
                  <button type="submit" className="btn btn-primary w-30 mt-3" disabled={!isCheck}>
                    Thuê {teacher.username}
                  </button>        
                </div>
              </div>
            </div>
          </div>

        </form>
      </div>

    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    role: state.auth.user.role
  };
};

const tmp = withRouter(CreateContract);
export default connect(
  mapStateToProps
)(tmp);
