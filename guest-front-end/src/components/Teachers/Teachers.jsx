import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Teacher from '../shared/Teacher/Teacher';
import './Teachers.scss';
import SelectOption from '../shared/SelectOption/SelectOption';
import ReactPaginate from 'react-paginate';
import { User } from '../../apis';
import history from '../../history';

const teacher = {
  avatar: 'https://www.upwork.com/profile-portraits/c17Ppw4ug0lV5mmvPQzWkIZ07oThUemdFLT0iTR4TOBGBCeFIIjcn36raL9f-xaJ2i',
  username: 'Trần Dần',
  email: 'a@gmail.com',
  salaryPerHour: 100000,
  address: 'Tp.Hồ Chí Minh',
  job: 'Giáo viên Toán',
  skills: [
    { name: 'Toán 12' }, { name: 'Tin học' }, { name: 'React' }, { name: 'Toán' }, { name: 'Lập trình web' },
  ]
}

const arrSortOption = [
  { text: 'Tên A-Z', code: 'name__increase' },
  { text: 'Tên Z-A', code: 'name__decrease' },
  { text: 'Giá tiền tăng', code: 'price__increase' },
  { text: 'Giá tiền giảm', code: 'price__decrease' },
  { text: 'Số học sinh đã dạy tăng', code: 'number__student__increase' },
  { text: 'Số học sinh đã dạy giảm', code: 'number__student__decrease' },
]

const arrPriceOption = [
  { text: 'Phí trên giờ bất kì', code: 'any' },
  { text: 'Dưới 20.000đ', code: '<20000' },
  { text: 'Từ 20.000đ đến 50.000đ', code: '20000->50000' },
  { text: 'Từ 50.000đ đến 70.000đ', code: '50000->70000' },
  { text: 'Từ 70.000đ đến 100.000đ', code: '70000->100000' },
  { text: 'Trên 100.000đ', code: '>100000' },
]

const arrAddressOption = [
  { text: 'Bất kì', code: 'any' },
  { text: 'Hà Nội', code: 'Hà Nội' },
  { text: 'Đà Nẵng', code: 'Đà Nẵng' },
  { text: 'Hồ Chí Mình', code: 'Hồ Chí Mình' },
]
class Teachers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      offset: 0,
      limit: 12,
      teachers: [],
      total: 0,
      loading: true,
      selectedSortOption: arrSortOption[0],
      selectedPriceOption: arrPriceOption[0],
      selectedAddressOption: arrAddressOption[0]
    };
  }

  reload = async () => {
    const { match } = this.props;
    const { category, id } = match.params;
    const {limit} = this.state;
    try {
      this.setState({loading: true});

      const {docs, total} = await User.getListTeacher({
        page: 1,
        limit,
        arrTagSkill: [id]
      });
      this.setState({teachers:docs, total});

      this.setState({loading: false});
    } catch (error) {
      console.log('err', error);
      this.setState({loading: false, teachers: []});
      let message = 'Some thing wrong!';
      if (error.response && error.response.data && error.response.data.message) message = error.response.data.message;
      User.alert.error(message);
    }
  }

  componentDidMount() {
    this.reload();
  }

  onClickBtnInfo = (id) => {
    const path = `/teacher/${id}`;
    localStorage.setItem(path, window.location.pathname);
    history.push(path);
  }

  setSortOption = (i) => {
    this.setState({ selectedSortOption: arrSortOption[i] })
  }
  setPriceOption = (i) => {
    this.setState({ selectedPriceOption: arrPriceOption[i] })
  }
  setAddressOption = (i) => {
    this.setState({ selectedAddressOption: arrAddressOption[i] })
  }
  renderHeader = () => {
    const text = ['Toán học', 'Vật lý', 'Hóa học', 'Tiếng Anh', 'Tiếng Nhật', 'Lập trình'];

    return (
      <div className="d-flex flex-wrap justify-content-between header">
        <div className="d-flex">
          {
            text.map((item) => {
              return (
                <a className="header-menu-item ml-3 mr-5"
                  href={`/cat/${item}/all`}
                  key={item}>
                  <h5><b>{item}</b></h5>
                </a>
              );
            })
          }
        </div>
        <a className="header-menu-item ml-3 mr-3 text-primary"
          href="/cat/all">
          <h5><b>Xem tất cả kĩ năng</b></h5>
        </a>
      </div>
    );
  }

  renderFilterOption = () => {
    const { selectedSortOption, selectedPriceOption, selectedAddressOption } = this.state;
    return (
      <>
        <div className="w-100 pl-3 pr-3 mb-2 d-flex align-items-center justify-content-between">
          <div>
            <span>Lọc theo</span>
            <SelectOption setOption={this.setAddressOption} selectedOption={selectedAddressOption} arrOption={arrAddressOption} />
            <SelectOption setOption={this.setPriceOption} selectedOption={selectedPriceOption} arrOption={arrPriceOption} />
          </div>
          <div>
            <span>Sắp xếp theo</span>
            <SelectOption setOption={this.setSortOption} selectedOption={selectedSortOption} arrOption={arrSortOption} />
          </div>
        </div>

      </>
    );
  }

  handlePageClick = data => {
    // let selected = data.selected;
    // let offset = Math.ceil(selected * this.props.perPage);

    // this.setState({ offset: offset }, () => {
    //   this.loadCommentsFromServer();
    // });
  };

  renderPageNumerNav() {
    const {total, limit} = this.state;
    const pageCount = Math.ceil(total/limit);

    return (
      <ReactPaginate
        previousLabel={'Trước'}
        nextLabel={'Tiếp'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={this.handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
    )
  }

  remderListTeacher = () => {
    const { total, loading, teachers } = this.state;
    const { match } = this.props;
    const { category } = match.params;
    console.log('teachers', teachers)


    return (
      <div className="categories-body">

        <div className="mt-3 mb-3 ml-2">

              <h4 className="mb-4">{`${(loading ||teachers.length === 0)?0:total} results for "${category}"`}</h4>
        </div>


        <div className="d-flex flex-column align-items-center">

          {this.renderFilterOption()}
          <div className="w-100">
            <div className="row no-gutters">
              {loading ? (
                <>
                  <div className="spinner-wrapper">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                </>
              ) : (
                  <>{
                    teachers.map((item, index) => {
                      return (
                        <div key={index} className="col-12 col-sm-6 col-md-4 col-xl-3">
                          <Teacher data={item} onClickBtn={this.onClickBtnInfo}/>
                        </div>
                      );
                    })
                  }</>)}
              {(!loading && teachers.length === 0 ) && (
                <h5 className="mt-5">Rỗng</h5>
              )}
            </div>
          </div>
          {teachers.length !== 0 && (<>{this.renderPageNumerNav()}</>)}
          
        </div>

      </div>
    );
  }

  render() {
    return (
      <div className="page-wrapper teachers">
        <div className="teachers--container">
          {this.renderHeader()}
          {this.remderListTeacher()}
        </div>
        {/* <ScriptTag src="/js/cv-in-category.js" type="text/javascript"/> */}
      </div>
    );
  }
}

export default withRouter(Teachers);