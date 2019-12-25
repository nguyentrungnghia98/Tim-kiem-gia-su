import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import {Container, Row, Col, Card, CardBody, Button, FormSelect, Alert, CardHeader, InputGroup, InputGroupAddon} from "shards-react";
import * as moment from "moment";

import PageTitle from "../components/common/PageTitle";
import Loading from "../components/loading/Loading";

import {fetchTopIncome} from '../actions/actionTopIncome'



const TopSkillIncome = (props) => {

  const [visibleMess, setVisibleMess] = useState(true);
  const [startDate, setStartDate] = useState(moment()
  .startOf('date')
  .format());

const {message,dataSkill,fetchTopIncome} = props;

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
        await fetchTopIncome(token,startDate,'Skill');
      } catch (err) {
        console.log('err', err);
      }
    };
    fetchDataTopIncome();
  }, []);


let rowSkills;

if(dataSkill !== []){
  rowSkills = dataSkill.map((skill, index) => {
    return(
                <tr key={index}>
                  <td><center>{index+1}</center></td>
                  <td><center>{skill.tagSkill[0].content}</center></td>
                  <td><center>{skill.tagSkill[0].numOfTeacher}</center></td>
                  <td><center>{skill.count.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</center></td>        
               </tr>
    )
});
}else{
  return <Loading/>
}

return(
<Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Kỹ năng" subtitle="Top doanh thu" className="text-sm-left" />
    </Row>
    {message ? <Container fluid className="px-0 mb-3">
                <Alert className="mb-0" dismissible={() => setVisibleMess(false)} open={visibleMess}>
                <i className="fa fa-info mx-2"></i>{message}
                </Alert>
        </Container> : null}

    <Row>
      <Col>
        <Card small className="mb-4">
        <CardHeader className="border-bottom">
          <Row>
            <Col><h5 className="mt-1 ml-4">Top doanh thu theo kỹ năng</h5>    </Col>
            <Col lg="3" className="mr-4"><InputGroup>
      <FormSelect onChange={(e) => setDate(e.target.value)}>
        <option value="today">Hôm nay</option>
        <option value="week">Tuần này</option>
        <option value="30days">30 ngày trước</option>
        <option value="90days">90 ngày trước</option>
        <option value="all">Tất cả</option>
      </FormSelect>
      <InputGroupAddon type="append">
        <Button theme="primary" onClick={() => {fetchTopIncome(token, startDate,'Skill')}}> Lọc</Button>
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
                  <center>Kỹ năng</center>
                  </th>
                  <th scope="col" className="border-0">
                    <center>Số lượng giáo viên</center>
                  </th>
                  <th scope="col" className="border-0">
                  <center>Doanh thu</center>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rowSkills}
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
      dataSkill: state.topIncomeReducer.dataSkill
  };
};

export default connect(mapStateToProps,{fetchTopIncome})(TopSkillIncome);