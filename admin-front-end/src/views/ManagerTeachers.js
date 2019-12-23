import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Alert,
  Modal,
  ModalBody,
  ModalHeader
} from "shards-react";

import PageTitle from "../components/common/PageTitle";
import Loading from "../components/loading/Loading";

import { fetchListUser, fetchBlocklUser } from "../actions/actionUser";
import { Link } from "react-router-dom";

const ManagerUsers = props => {
  // const [open, setOpen] = useState(false);
  // const [content, setContent] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [userID, setUserID] = useState("");
  const [status, setStatus] = useState("");

  const { message, listUsers, fetchListUser, fetchBlocklUser } = props;

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        await fetchListUser(token);
      } catch (err) {
        console.log("err", err);
      }
    };
    fetchDataUser();
  }, []);

  function setInfoModal(id, status) {
    setOpenModal(!openModal);
    setUserID(id);
    setStatus(status);
  }

  let rowsUser;

  if (listUsers !== null) {
    rowsUser = listUsers.map((user, index) => {
      return (
        <tr key={index}>
          <td>
            <center>{index + 1}</center>
          </td>
          <td>
            <center>{user.username}</center>
          </td>
          <td>
            <center>{user.email}</center>
          </td>
          <td>
            <center>{user.salaryPerHour.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</center>
          </td>
          <td>
            <center>
              {user.status === "active" ? (
                <i className="material-icons icon-green">done</i>
              ) : (
                <i className="material-icons icon-red">highlight_off</i>
              )}
            </center>
          </td>
          <td>
            <center>
              <Button
                theme="while"
                className="p-0 btn-icon"
                title="Xem chi tiết"
                onClick={() => {}}
              >
                <Link to={`/user-detail/${user._id}`}>
                  <i className="material-icons icon-blue">remove_red_eye</i>
                </Link>
              </Button>
              <Button
                theme="while"
                className="p-0 btn-icon"
                title="Khóa tài khoản"
                onClick={() => {
                  setInfoModal(user._id, "block");
                }}
              >
                <i className="material-icons ml-2 icon-red">block</i>
              </Button>
              <Button
                theme="while"
                className="p-0 btn-icon"
                title="Mở khóa tài khoản"
                onClick={() => {
                  setInfoModal(user._id, "active");
                }}
              >
                <i className="material-icons ml-2 icon-green">lock_open</i>
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
          title="Người dạy"
          subtitle="Quản lý"
          className="text-sm-left"
        />
      </Row>
      {message ? (
        <Container fluid className="px-0 mb-3">
          <Alert className="mb-0">
            <i className="fa fa-info mx-2"></i>
            {message}
          </Alert>
        </Container>
      ) : null}
      {/* Default Light Table */}
      <Row>
        <Col>
          <Card small className="mb-4">
            {/*<Button type="button" className="mr-3" onClick={() => setOpen(!open)}>Thêm Tag mới</Button>
            <Modal size="sm" open={open} toggle={() => setOpen(!open)} centered>
              <ModalHeader><center>Thêm tag kĩ năng mới</center></ModalHeader>
              <ModalBody className="p-3">
              
              <Form onSubmit={(e) => {e.preventDefault(); fetchAddTagSkill(content, token); setOpen(!open)}}>             
              <FormGroup>
                  <label htmlFor="feTagSkill">Tag kĩ năng</label>    
                      <FormInput
                      id="feTagSkill"
                      type="text"
                      value={content} onChange={(e) => setContent(e.target.value)} required
                      />

              </FormGroup><center>
              <Button theme="secondary" className="mr-3" type="button"  onClick={() => setOpen(!open)}>Đóng</Button>
              <Button type="submit">Tạo</Button></center>
              </Form>
              
              </ModalBody>
                </Modal>*/}
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
                      <center>Lương (VND/h)</center>
                    </th>
                    <th scope="col" className="border-0">
                      <center>Trạng thái</center>
                    </th>
                    <th scope="col" className="border-0">
                      <center>Chức năng</center>
                    </th>
                  </tr>
                </thead>
                <tbody>{rowsUser}</tbody>
              </table>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Modal
        size="sm"
        open={openModal}
        toggle={() => setOpenModal(!openModal)}
        centered
      >
        <ModalHeader>
          {status === "block" ? "Khóa tài khoản" : "Mở khóa tài khoản"}
        </ModalHeader>
        <ModalBody className="p-3">
          <label className="mb-3">
            Bạn có chắc chắn muốn{" "}
            <b className="text-danger">
              {status === "block" ? "khóa" : "mở khóa"}
            </b>{" "}
            người dùng này không ?
          </label>
          <center>
            <Button
              theme="secondary"
              className="mr-3"
              type="button"
              onClick={() => setOpenModal(!openModal)}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              onClick={() => {
                setOpenModal(!openModal);
                fetchBlocklUser(token, userID, status);
              }}
            >
              Đồng ý
            </Button>
          </center>
        </ModalBody>
      </Modal>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    message: state.authReducer.message,
    listUsers: state.authReducer.listUsers
  };
};

export default connect(mapStateToProps, { fetchListUser, fetchBlocklUser })(
  ManagerUsers
);
