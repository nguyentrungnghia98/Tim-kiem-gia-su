import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Container, Row, Col, Card, CardBody, Button, FormSelect, Alert, CardHeader, InputGroup, InputGroupAddon} from "shards-react";
import * as moment from "moment";

import PageTitle from "../components/common/PageTitle";
import Loading from "../components/loading/Loading";

import {fetchTopIncome} from '../actions/actionTopIncome'



const TopTeacherIncome = (props) => {

  const [visibleMess, setVisibleMess] = useState(true);
  const [startDate, setStartDate] = useState(moment()
  .startOf('date')
  .format());

const {message,dataTeacher,fetchTopIncome} = props;

const token = localStorage.getItem('token');

const setDate = date => {
  if (date === "today") {
    setStartDate(
      moment()
        .startOf("date")
        .format()
    );

  }
  if (date === "week") {
    setStartDate(
      moment()
        .subtract(7, 'days')
        .format()
    );
  }
  if (date === "30days") {
    setStartDate(
      moment()
      .subtract(30, 'days')
        .format()
    );
  }
  if (date === "90days") {
    setStartDate(
      moment()
        .subtract(90, 'days')
        .format()
    );
  }
  if (date === "all"){
    setStartDate("");
  }
};

  useEffect(() => {
    const fetchDataTopIncome = async () => {
      try {
        await fetchTopIncome(token,startDate,'Teacher');
      } catch (err) {
        console.log('err', err);
      }
    };
    fetchDataTopIncome();
  }, []);


let rowUsers;

if(dataTeacher !== []){
  rowUsers = dataTeacher.map((user, index) => {
    return(
                <tr key={index}>
                  <td><center>{index+1}</center></td>
                  <td><center><Link to={`/user-detail/${user._id}`}>{user.infoUser[0].username}</Link></center></td>
                  <td><center>{user.infoUser[0].email}</center></td>
                  <td><center>{user.infoUser[0].salaryPerHour.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</center></td>    
                  <td><center>{user.count.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</center></td>        
               </tr>
    )
});
}else{
  return <Loading/>
}

console.log(startDate)
return(
<Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Người dạy" subtitle="Top doanh thu" className="text-sm-left" />
    </Row>
    {message ? <Container fluid className="px-0 mb-3">
                <Alert className="mb-0" dismissible={() => setVisibleMess(false)} open={visibleMess}>
                <i className="fa fa-info mx-2"></i>{message}
                </Alert>
        </Container> : null}
    {/* Default Light Table */}
    <Row>
      <Col>
        <Card small className="mb-4">
        <CardHeader className="border-bottom">
          <Row>
            <Col><h5 className="mt-1 ml-4">Top doanh thu người dạy</h5>    </Col>
            <Col lg="3" className="mr-4"><InputGroup>
      <FormSelect onChange={(e) => setDate(e.target.value)}>
        <option value="today">Hôm nay</option>
        <option value="week">Tuần này</option>
        <option value="30days">30 ngày trước</option>
        <option value="90days">90 ngày trước</option>
        <option value="all">Tất cả</option>
      </FormSelect>
      <InputGroupAddon type="append">
        <Button theme="primary" onClick={() => {fetchTopIncome(token, startDate,'Teacher')}}> Lọc</Button>
      </InputGroupAddon>
    </InputGroup></Col>
            </Row>       
          </CardHeader>
          <CardBody className="p-0 pb-3">
            <table className="table mb-0">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                  <center>#</center>
                  </th>
                  <th scope="col" className="border-0">
                  <center>Họ và tên</center>
                  </th>
                  <th scope="col" className="border-0">
                    <center>Email</center>
                  </th>
                  <th scope="col" className="border-0">
                  <center>Lương theo giờ</center>
                  </th>
                  <th scope="col" className="border-0">
                  <center>Doanh thu</center>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rowUsers}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Col>
    </Row>
    </Container>
)
};

const mapStateToProps = (state) => {
  return {
      message: state.topIncomeReducer.message,
      dataTeacher: state.topIncomeReducer.dataTeacher
  };
};

export default connect(mapStateToProps,{fetchTopIncome})(TopTeacherIncome);