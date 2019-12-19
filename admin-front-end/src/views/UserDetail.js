import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row } from "shards-react";
import { useParams, useHistory } from "react-router-dom";

import { Button, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import UserDetails from "../components/user-detail/UserDetails";
import Loading from "../components/loading/Loading";

import { fetchUserDetail } from "../actions/actionUser";

const UserDetail = props => {
  let objectID = useParams();
  let history = useHistory();
  const { userDetail, fetchUserDetail } = props;

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        await fetchUserDetail(token, objectID.id);
      } catch (err) {
        console.log("err", err);
      }
    };
    fetchDetail();
  }, []);

  if (userDetail === undefined || userDetail._id !== objectID.id) {
    return <Loading />;
  }
  console.log(userDetail);
  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          title="Người dùng"
          subtitle="Xem chi tiết"
          md="12"
          className="ml-sm-auto mr-sm-auto"
        />
      </Row>
      <div className="ml-5 mr-5">
        <div className="create-account">
          <Col lg="10">
            <UserDetails userInfo={userDetail} />
          </Col>
        </div>
      </div>
      <Button
        pill
        size="sm"
        theme="info"
        className="mb-2"
        onClick={() => {
          history.goBack();
        }}
      >
        &larr; Go Back
      </Button>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    userDetail: state.authReducer.userDetail
  };
};
export default connect(mapStateToProps, { fetchUserDetail })(UserDetail);
