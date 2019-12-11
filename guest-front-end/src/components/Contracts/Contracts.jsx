import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { User } from '../../apis';
import history from '../../history';
import './Contracts.scss';
import { converCurrency } from '../../utils/pipe';
import SelectOption from '../shared/SelectOption/SelectOption';
import ReactPaginate from 'react-paginate';
import {Link} from 'react-router-dom';

const contracts = [{
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
  status: 'pending_accept',
  totalHour: 6,
  description: `Dạy hóa học lớp 12 phục vụ mục đích thi đại học. Mỗi tối 2 tiếng, bắt đầu từ 7:30PM đến 9:30PM. Kết quả nhận được:Hệ thống toàn bộ kiến thức và phương pháp giải bài tập thi THPT quốc gia.
  Hiểu được bản chất các hiện tượng hóa học và các quá trình phản ứng.
  Được tiếp cận với những phương pháp giải nhanh để xử lí các bài toán phức tạp.
  Được luyện tập với kho bài tập tự luyện phong phú và đa dạng.
  Được trải nghiệm dịch vụ hỗ trợ học tập chu đáo.`
}, {
  teacher: {
    avatar: 'https://www.upwork.com/profile-portraits/c1m-NSeiQdIlI4WsEQYDEuDtVoKWhoNMFkKyK1BF-TIyOgePyEw6ysNXU5VjPCPMG-',
    username: 'Vũ Khắc Ngọc',
    job: 'Giáo viên hóa học'
  },
  student: {
    avatar: 'https://www.upwork.com/profile-portraits/c17BYIgRrMazxmNaAEJVgAVepi5QkQ77qyyv77n3NwVLxkLgtAtxS_ad96_Z4eS_CY',
    username: 'Superman',
    job: 'THPT Lê Hồng Phong'
  },
  status: 'processing',
  name: 'Dạy hóa học 12 vào tối T5,T6,T7',
  salaryPerHour: 50000,
  totalHour: 2,
  description: 'Dạy hóa học lớp 12 phục vụ mục đích thi đại học. Mỗi tối 2 tiếng, bắt đầu từ 7:30PM đến 9:30PM'
}]

const arrSortOption = [
  { text: 'Ngày tạo tăng', code: 'username_1' },
  { text: 'Ngày tạo giảm', code: 'username_-1' },
  { text: 'Giá tiền tăng', code: 'salaryPerHour_1' },
  { text: 'Giá tiền giảm', code: 'salaryPerHour_-1' },
]

const arrStatusOption = [
  { text: 'Bất kì', code: 'any' },
  { text: 'Chờ giáo viến đồng ý', code: 'pending_accept' , className:'text-warning'},
  { text: 'Đang học', code: 'processing', className:'text-success' },
  { text: 'Chờ giải quyết khiếu nại', code: 'processing_complaint' , className:'text-error'},
  { text: 'Khiếu nại thành công', code: 'complainted', className:'text-error' },
  { text: 'Kết thúc thành công', code: 'finished' , className:'text-success'},
]

const Contracts = (props) => {
  const [loading, setLoading] = useState(false)
  const { teacher, student, name, salaryPerHour, totalHour, description } = contracts[0];
  const [selectedSortOption, setSelectedSortOption] = useState(arrSortOption[0])
  const [selectedStatusOption, setSelectedStatusOption] = useState(arrStatusOption[0]);
  const [page, setPage] = useState(1);
  const limit = 6;

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
    console.log(selectedSortOption)
    //loadInfoUser();
  }, [selectedSortOption])

  function setSortOption(i) {
    setSelectedSortOption(arrSortOption[i]);
  }

  function setStatusOption(i) {
    setSelectedStatusOption(arrStatusOption[i]);
  }

  function handlePageClick(data) {
    setPage(data.selected + 1);
    //this.reload();
  }

  function renderButtonActions(status){       
    switch(status){
      case 'pending_accept':
        return (
          <>
            <button className="btn btn-secondary mr-3">Từ chối</button>
            <button className="btn btn-primary">Đồng ý</button>
          </>
        )
      case 'processing':
          return (
            <>
              <button className="btn btn-danger">Khiếu nại</button>
            </>
          )
      default:
            return null;
    }
  }
  function renderStatus(status){
    const statusData = arrStatusOption.find(el => el.code === status);
    if(!statusData) return 'unknown'
    return <div className={statusData.className}>{statusData.text}</div>
  }
  function renderContracts() {
    if (loading) {
      return (
        <div className="spinner-wrapper mt-5" >
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>

      )
    }
    if (contracts.length === 0) {
      return (
        <h5 className="mt-5"><i>Không tìm thấy hợp đồng</i></h5>
      )
    }
    const total = contracts.length;
    const pageCount = Math.ceil(total / limit);

    return (
      <>
        <div className="contracts">
          {
            contracts.map(({ status,name, student,salaryPerHour,totalHour,description }, index) => {
              return (
                <div key={index} className="contract">
                <Link to={`/teacher/${'5dededd312755689983e05723'}`}>
                  <img src={student.avatar ? student.avatar : "/images/avatar.png"}
                    onError={(image) => {
                      image.target.src = "/images/avatar.png";
                    }} alt="avatar" />
                    </Link>
                  <div className="contract-info w-100">
                    <Link to={`/teacher/${'5dededd312755689983e05723'}`} className="no-style-link">
                    <div className="row ">
                      <div className="col-8 d-flex text-primary align-items-center">
                        <h5>{student.username}</h5>
                        <small className="ml-3"> - {student.job || 'Không rõ'}</small>
                      </div>
                      <div className="col-4 text-right">                      
                      {renderButtonActions(status)}
                      </div>
                    </div>
                    </Link>
                    <Link to="/contract" className="no-style-link">
                    <h5 className="mb-3">{name || 'Không rõ'}</h5>
                    <div className="row">
                      <div className="col-4">
                        Giá tiền: <b> {converCurrency(salaryPerHour)} / hr</b>
                      </div>
                      <div className="col-4">
                        Thời gian: <b> {converCurrency(totalHour)} / hr</b>
                      </div>
                      <div className="col-4">
                        Tổng tiền: <b> {converCurrency(totalHour*salaryPerHour)} / hr</b>
                      </div>
                    </div>

                    <div className="my-2 d-flex">
                      <span className="mr-2">Trạng thái: </span> {renderStatus(status)}
                    </div>

                    <div className="d-flex mb-2">
                    <span className="mr-2">Mô tả: </span> 
                    <span className="description">
                      {description}
                    </span>
                    </div>
                    </Link>
                  </div>
                </div>
              )
            })
          }
        </div>
        <ReactPaginate
          previousLabel={'Trước'}
          nextLabel={'Tiếp'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
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

  return (
    <div className="page-wrapper contracts-container">
      <div className="contract-detail-container">
        <h4 className="ml-5">Danh sách hợp đồng</h4>
        <div className="teacher custom-card">
          <div className="custom-card-container">
            <div className="custom-card--header">
              <div className='seach-box'>
                <i className="fas fa-search" />
                <div className='search-input'>
                  <input
                    className='custom-input-text'
                    type='text'
                    placeholder='Bạn muốn học gì...'
                  />
                </div>
              </div>
            </div>
            <div className="contract-options">
              <div className="d-flex align-items-center justify-content-between">
                <div><span><b>Sắp xếp theo</b></span>
                  <SelectOption setOption={setSortOption} selectedOption={selectedSortOption} arrOption={arrSortOption} /></div>
                <div>
                  <span><b>Trạng thái</b></span>
                  <SelectOption setOption={setStatusOption} selectedOption={selectedStatusOption} arrOption={arrStatusOption} />
                </div>

              </div>
            </div>
            <div className="custom-card--body">

              {renderContracts()}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default withRouter(Contracts);