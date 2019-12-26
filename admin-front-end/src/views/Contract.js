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
} from "shards-react";

import PageTitle from "../components/common/PageTitle";
import Loading from "../components/loading/Loading";
// import AlertMessage from "../components/alert/AlertMessage";

import {fetchContract, fetchUpdateContract} from "../actions/actionContract";
import { Link } from "react-router-dom";

import tz from 'timezone'

const ManagerContract = props => {

    const [openModal, setOpenModal] = useState(false);
  const [contractID, setContractID] = useState("");
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [visibleMess, setVisibleMess] = useState(true);

  const {message, listContracts, totalContracts, fetchContract, fetchUpdateContract} = props;

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDataContract = async () => {
      try {
        await fetchContract(token);
      } catch (err) {
        console.log("err", err);
      }
    };
    fetchDataContract();
  }, []);

  const setPagination = () => {
    var tempt = totalContracts % 10 === 0 ? 0: 1;
    let totalPage = parseInt(totalContracts / 10 + tempt);
    var pages = [];
    if(totalPage > 1){
    for (let i = 0; i < totalPage; i++){
      pages.push(<Button key={i} type="button" theme="primary" outline className="btn-pagination" disabled={currentPage === i ? true : false} onClick={() => {setCurrentPage(i); fetchContract(token,i,status)}}>{i+1}</Button>)
    }}
    return(<div className="mb-3 create-account">
      <Button type="button" theme="primary" className="btn-pagination" hidden={totalPage === 1 ? true : false} disabled={currentPage === 0 ? true : false} onClick={() => {setCurrentPage(currentPage-1); fetchContract(token,currentPage -1,status)}}><i className="material-icons">
      navigate_before
      </i></Button>
      {pages}
    <Button type="button" theme="primary" className="btn-pagination" hidden={totalPage === 1 ? true : false} disabled={currentPage + 1  === totalPage ? true : false} onClick={() => {setCurrentPage(currentPage+1); fetchContract(token,currentPage+1,status)}}><i className="material-icons">
    navigate_next
    </i></Button></div>)
  };

  function renderStatus(status){
    switch (status) {
        case 'pending':
            return(<span className="text-info">Chờ xác nhận</span>)
        case 'denied':
            return(<span className="text-danger">Từ chối</span>)
        case 'processing':
            return(<span className="text-primary">Đang diễn ra</span>)
        case 'processing_complaint':
            return(<span className="text-warning">Đang khiếu nại</span>)
        case 'complainted':
            return(<span className="text-secondary">Hoàn tất khiếu nại</span>)
        case 'finished':
            return(<span className="text-success">Hoàn tất</span>)
        case 'complaint_fail':
          return(<span className="text-dark">Khiếu nại thất bại</span>)
        default:
            break;
    }
  }

  const asia = tz(require('timezone/Asia'))

  let rowsContract;

  if (listContracts !== null) {
    rowsContract = listContracts.map((contract, index) => {
      return (
        <tr key={index}>
          <td>
            <center>{index + 1}</center>
          </td>
          <td>
            <center>{contract.name}</center>
          </td>
          <td>
            <center><Link to={`/user-detail/${contract.teacher._id}`}>{contract.teacher !== null ? contract.teacher.username : ""}</Link></center>
          </td>
          <td>
            <center><Link to={`/user-detail/${contract.student._id}`}>{contract.student !== null ? contract.student.username : ""}</Link></center>
          </td>
          <td>
            <center>{contract.numberOfHour}</center>
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
          <td>
            <center>{renderStatus(contract.status)}</center>
          </td>
          <td>
            <center>
              <Button
                theme="while"
                className="p-0 btn-icon"
                title="Thay đổi trạng thái hợp đồng"
                onClick={() => {setOpenModal(!openModal); setContractID(contract._id)}}
              >               
                  <i className="material-icons icon-blue">edit</i>
              </Button>             
            </center>
          </td>
        </tr>
      );
    });
  } else {
    return <Loading />;
  }

  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Hợp đồng học"
          subtitle="Quản lý"
          className="text-sm-left"
        />
      </Row>
      {message ? (
        <Container fluid className="px-0 mb-3">
          <Alert className="mb-0" dismissible={() => setVisibleMess(false)} open={visibleMess}>
            <i className="fa fa-info mx-2"></i>
            {message}
          </Alert>
        </Container>
      ) : null}

      <Row>
        <Col>
          <Card small className="mb-4">

          <CardHeader className="border-bottom">
          <Row>
            <Col><h5 className="mt-1 ml-4">Hợp đồng</h5>    </Col>
            <Col lg="4"><InputGroup>
      <FormSelect onChange={(e) => setStatus(e.target.value)}>
        <option value="">Tất cả trạng thái</option>
        <option value="pending">Chờ xác nhận</option>
        <option value="denied">Từ chối</option>
        <option value="processing">Đang diễn ra</option>
        <option value="processing_complaint">Đang khiếu nại</option>
        <option value="complainted">Hoàn tất khiếu nại</option>
        <option value="complaint_fail">Khiếu nại thất bại</option>
        <option value="finished">Hoàn tất</option>
      </FormSelect>
      <InputGroupAddon type="append">
        <Button theme="primary" onClick={() => {setCurrentPage(0); fetchContract(token, 0 , status)}}> Lọc</Button>
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
                      <center>Tên hợp đồng</center>
                    </th>
                    <th scope="col" className="border-0">
                      <center>Người dạy</center>
                    </th>
                    <th scope="col" className="border-0">
                      <center>Người học</center>
                    </th>
                    <th scope="col" className="border-0">
                      <center>Số giờ thuê</center>
                    </th>
                    <th scope="col" className="border-0">
                      <center>Giá thuê (VNĐ)</center>
                    </th>
                    {/*<th scope="col" className="border-0">
                      <center>Mô tả</center>
                    </th>*/}
                    <th scope="col" className="border-0">
                      <center>Ngày tạo</center>
                    </th>
                    <th scope="col" className="border-0">
                      <center>Trạng thái</center>
                    </th>
                    <th scope="col" className="border-0">
                      <center>Chức năng</center>
                    </th>
                  </tr>
                </thead>
                <tbody>{rowsContract}</tbody>
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
          Thay đổi trạng thái hợp đồng
        </ModalHeader>
        <ModalBody className="p-3">
        <FormSelect className="col-10 ml-5" onChange={(e) => setStatus(e.target.value)}>
        <option hidden>Lựa chọn trạng thái</option>
        <option value="pending">Chờ xác nhận</option>
        <option value="denied">Từ chối</option>
        <option value="processing">Đang diễn ra</option>
        <option value="processing_complaint">Đang khiếu nại</option>
        <option value="complainted">Hoàn tất khiếu nại</option>
        <option value="complaint_fail">Khiếu nại thất bại</option>
        <option value="finished">Hoàn tất</option>
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
                fetchUpdateContract(contractID,status,token);     
              }}
            >
              Xác nhận
            </Button>

        </ModalFooter>
      </Modal>

      </Container>
  );
};

const mapStateToProps = state => {
  return {
    message: state.contractReducer.message,
    listContracts: state.contractReducer.listContracts,
    totalContracts: state.contractReducer.totalContracts
  };
};

export default connect(mapStateToProps, {fetchContract, fetchUpdateContract})(
  ManagerContract
);
