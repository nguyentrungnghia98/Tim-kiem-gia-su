import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Alert,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  FormSelect,
  InputGroup,
  InputGroupAddon,
  ButtonToolbar,
  FormInput,
  InputGroupText,

} from "shards-react";

import PageTitle from "../components/common/PageTitle";
import Loading from "../components/loading/Loading";
// import AlertMessage from "../components/alert/AlertMessage";

import {fetchComplaint, fetchUpdateContract, fetchConversation} from "../actions/actionContract";
import { Link } from "react-router-dom";

import tz from 'timezone'

const ManagerComplaint = props => {

    const [openModal, setOpenModal] = useState(false);
    const [openModalMessage, setOpenModalMessage] = useState(false);
  const [contractID, setContractID] = useState("");
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [visibleMess, setVisibleMess] = useState(true);
  const [userID, setUserID] = useState('');

  const {messageComplaint, listComplaints, totalComplaints, listMessages, fetchComplaint, fetchUpdateContract,fetchConversation} = props;

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDataComplaint = async () => {
      try {
        await fetchComplaint(token,0);
      } catch (err) {
        console.log("err", err);
      }
    };
    fetchDataComplaint();
  }, []);

  const setPagination = () => {
    var tempt = totalComplaints % 10 === 0 ? 0: 1;
    let totalPage = parseInt(totalComplaints / 10 + tempt);
    var pages = [];
    if(totalPage > 1){
    for (let i = 0; i < totalPage; i++){
      pages.push(<Button key={i} type="button" theme="primary" outline className="btn-pagination" disabled={currentPage === i ? true : false} onClick={() => {setCurrentPage(i); fetchComplaint(token,i)}}>{i+1}</Button>)
    }}
    return(<div className="mb-3 create-account">
      <Button type="button" theme="primary" className="btn-pagination" hidden={totalPage === 1 ? true : false} disabled={currentPage === 0 ? true : false} onClick={() => {setCurrentPage(currentPage-1); fetchComplaint(token,currentPage -1)}}><i className="material-icons">
      navigate_before
      </i></Button>
      {pages}
    <Button type="button" theme="primary" className="btn-pagination" hidden={totalPage === 1 ? true : false} disabled={currentPage + 1  === totalPage ? true : false} onClick={() => {setCurrentPage(currentPage+1); fetchComplaint(token,currentPage+1)}}><i className="material-icons">
    navigate_next
    </i></Button></div>)
  };

  const asia = tz(require('timezone/Asia'))

  let rowComplaints;

  if (listComplaints !== null) {
    rowComplaints = listComplaints.map((contract, index) => {
      return (
        <tr key={index}>
          <td>
            <center>{index + 1}</center>
          </td>
          <td>
            <center><Link to={`/user-detail/${contract.student._id}`}>{contract.student !== null ? contract.student.username : ""}</Link></center>
          </td>
          <td>
            <center><Link to={`/user-detail/${contract.student._id}`}>{contract.teacher !== null ? contract.teacher.username : ""}</Link></center>
          </td>
          
          <td>
            <center>{contract.name}</center>
          </td>
          <td>
            <center>{contract.totalPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</center>
          </td>
          {/*<td>
            <center>{contract.describe}</center>
          </td>*/}
          <td>
            <center>{asia(contract.createTime, '%d/%m/%Y %H:%M', 'Asia/Ho_Chi_Minh')}</center>
          </td>
          <td>text</td>
          <td>
            <center>
                <Button
                theme="while"
                className="p-0 btn-icon"
                title="Xem tin nhắn"
                onClick={() => {setOpenModalMessage(!openModalMessage); setUserID(contract.student._id); fetchConversation(token,contract.student._id,contract.teacher._id, contract.createTime);}} 
              >               
                  <i className="material-icons text-info">message</i>
              </Button> 
              <Button
                theme="while"
                className="p-0 btn-icon"
                title="Giải quyết khiếu nại"
                onClick={() => {setOpenModal(!openModal); setContractID(contract._id)}}
              >               
                  <i className="material-icons ml-2 icon-blue">edit</i>
              </Button>             
            </center>
          </td>
        </tr>
      );
    });
  } else {
    return <Loading />;
  }

  let renderMessage;
  if(listMessages !== []){
    renderMessage = listMessages.map((message, i) => {
        if(message.sendBy._id === userID){
            return (<div key={i} className="incoming_msg">
        
            <div className="received_msg">
                  <span className="text-secondary mb-2">{message.sendBy.username}</span>
              <div className="received_withd_msg">
                <p>{message.content}</p>
                <span className="time_date">{asia(message.createAt, '%d/%m/%Y %H:%M', 'Asia/Ho_Chi_Minh')}</span></div>
            </div>
          </div>)
        }else {
            return (<div key={i} className="outgoing_msg">
            <div className="sent_msg">
                <span className="text-secondary mb-2">{message.sendBy.username}</span>
              <p>{message.content}</p>
              <span className="time_date">{asia(message.createAt, '%d/%m/%Y %H:%M', 'Asia/Ho_Chi_Minh')}</span> </div>
          </div>)
        }
})}

  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Khiếu nại"
          subtitle="Quản lý"
          className="text-sm-left"
        />
      </Row>
      {messageComplaint ? (
        <Container fluid className="px-0 mb-3">
          <Alert className="mb-0" dismissible={() => setVisibleMess(false)} open={visibleMess}>
            <i className="fa fa-info mx-2"></i>
            {messageComplaint}
          </Alert>
        </Container>
      ) : null}

      <Row>
        <Col>
          <Card small className="mb-4">

          <CardHeader className="border-bottom">
          <ButtonToolbar>
            <span className="ml-3 pt-1 fs-header-table">
              Danh sách khiếu nại
            </span>

            <InputGroup seamless size="lg" className="ml-auto mr-3">
              <FormInput placeholder="Tìm kiếm..." />
              <InputGroupAddon type="append">
                <InputGroupText>
                  <i className="material-icons">search</i>
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </ButtonToolbar>
        </CardHeader>

            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      <center>#</center>
                    </th>
                    
                    <th scope="col" className="border-0">
                      <center>Người khiếu nại</center>
                    </th>
                    <th scope="col" className="border-0">
                      <center>Người dạy</center>
                    </th>
                    <th scope="col" className="border-0">
                      <center>Hợp đồng</center>
                    </th>
                    <th scope="col" className="border-0">
                      <center>Giá thuê (VNĐ)</center>
                    </th>
                    <th scope="col" className="border-0">
                      <center>Ngày tạo</center>
                    </th>
                    <th scope="col" className="border-0">
                    <center>Nội dung khiếu nại</center>
                  </th>
                    
                    <th scope="col" className="border-0">
                      <center>Chức năng</center>
                    </th>
                  </tr>
                </thead>
                <tbody>{rowComplaints}</tbody>
              </table>
            </CardBody>
          </Card>
        </Col>
      </Row>
        {setPagination()}
     <Modal
        open={openModal}
        toggle={() => setOpenModal(!openModal)}
        centered
      >
        <ModalHeader>
          Giải quyết khiếu nại
        </ModalHeader>
        <ModalBody className="p-3">
        <FormSelect className="col-10 ml-5" onChange={(e) => setStatus(e.target.value)}>
        <option hidden>Lựa chọn</option>
        <option value="complaint_fail">Khiếu nại thất bại & Hoàn tất hợp đồng</option>
        <option value="complainted">Khiếu nại thành công & Hoàn tiền người học</option>
      </FormSelect>
      </ModalBody>
      <ModalFooter>
            <Button
              theme="secondary"
              className="mr-2"
              type="button"
              onClick={() => setOpenModal(!openModal)}
            >
              Đóng
            </Button>
            <Button
              type="submit"
              onClick={() => {
                setOpenModal(!openModal); 
                fetchUpdateContract(contractID,status,token, true);     
              }}
            >
              Xác nhận
            </Button>

        </ModalFooter>
      </Modal>
      <Modal
        open={openModalMessage}
        size = 'lg'
        toggle={() => setOpenModalMessage(!openModalMessage)}
        centered
      >
        <ModalHeader>
          Tin nhắn
        </ModalHeader>
        <ModalBody className="p-3 modal-body">
        
        {renderMessage}
      
      </ModalBody>
      <ModalFooter>
            <Button
              theme="secondary"
              className="mr-2"
              type="button"
              onClick={() => setOpenModalMessage(!openModalMessage)}
            >
              Đóng
            </Button>
        </ModalFooter>
      </Modal>

      </Container>
  );
};

const mapStateToProps = state => {
  return {
    messageComplaint: state.contractReducer.messageComplaint,
    listComplaints: state.contractReducer.listComplaints,
    totalComplaints: state.contractReducer.totalComplaints,
    listMessages : state.contractReducer.listMessages,
  };
};

export default connect(mapStateToProps, {fetchComplaint, fetchUpdateContract,fetchConversation})(
  ManagerComplaint
);
