import React from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import UserDetails from "../components/user-profile-lite/UserDetails";
import UserAccountDetails from "../components/user-profile-lite/UserAccountDetails";
import { fetchUpdate } from "../actions/actionUser";

import Loading from "../components/loading/Loading";

const UserProfile = props => {
  const { userInfo, fetchUpdate, message } = props;

  if (userInfo !== null) {
    // console.log(userInfo)
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="Chỉnh sửa trang cá nhân"
            subtitle="Cài đặt"
            md="12"
            className="ml-sm-auto mr-sm-auto"
          />
        </Row>
        <div className="create-account">
          <Col lg="4">
            <UserDetails userInfo={userInfo} />
          </Col>
          <Col lg="6">
            <UserAccountDetails
              userInfo={userInfo}
              fetchUpdate={fetchUpdate}
              message={message}
            />
          </Col>
        </div>
      </Container>
    );
  }
  return <Loading />;
};
const mapStateToProps = state => {
  return {
    userInfo: state.authReducer.userInfo,
    message: state.userReducer.message
  };
};

export default connect(mapStateToProps, { fetchUpdate })(UserProfile);
