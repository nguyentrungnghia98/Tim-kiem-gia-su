import React from "react";
import PropTypes from "prop-types";

import {
  Card,
  CardHeader,
  Badge,
  ListGroup,
  ListGroupItem,
} from "shards-react";

//const BrowserHistory = ReactRouter.browserHistory;
const UserDetails = props => {
  const { userInfo } = props;

  return (
    <div>
      <Card small className="mb-4 pt-3">
        <CardHeader className="border-bottom text-center">
          <div className="mb-3 mx-auto">
            <img
              className="rounded-circle"
              src={userInfo.avatar}
              alt={userInfo.fullName}
              width="180"
            />
          </div>
          <h4 className="mb-2">
            {userInfo.username} ({userInfo.email})
          </h4>
          <h5 className="text-warning d-block mb-2">
            {userInfo.role ? "Giáo viên" : "Học sinh"}
          </h5>

          <Badge
            pill
            className={`bg-${
              userInfo.status === "active" ? "success" : "danger"
            }`}
          >
            {userInfo.status === "active" ? "Đang hoạt động" : "Đã bị khóa"}
          </Badge>
        </CardHeader>
        <ListGroup flush>
          {userInfo.salaryPerHour ? (
            <ListGroupItem className="px-4">
              <div className="progress-wrapper">
                <strong className="d-block mb-2">
                  <i className="material-icons mr-1">monetization_on</i> Lương:
                  <span className="ml-2 text-dark">
                    {userInfo.salaryPerHour} (VND/h)
                  </span>
                </strong>
              </div>
            </ListGroupItem>
          ) : null}
          <ListGroupItem className="px-4">
            <strong className="d-block mb-2">
              <i className="material-icons mr-1">local_offer</i>Tag kĩ năng:
              <span className="ml-2">
                {userInfo.major.map((major, i) => (
                  <Badge
                    outline                 
                    theme="secondary"
                    className="mb-2 mr-1"
                  >
                    {major.content}
                  </Badge>
                ))}
              </span>
            </strong>
          </ListGroupItem>

          <ListGroupItem className="px-4">
            <div className="progress-wrapper">
              <strong className="d-block mb-2">
                <i className="material-icons mr-1">work</i> Công việc:
                <span className="ml-2 text-dark">{userInfo.job}</span>
              </strong>
            </div>
          </ListGroupItem>
          <ListGroupItem className="p-4">
            <strong className="d-block mb-2">
              <i className="material-icons mr-1">room</i>Địa chỉ:{" "}
              <span className="ml-2 text-dark">{userInfo.address}</span>
            </strong>
          </ListGroupItem>
          <ListGroupItem className="p-4">
            <strong className="d-block mb-2">
              <i className="material-icons mr-1">create</i> Giới thiệu:
            </strong>
            <strong>
              <span className="mt-3 text-dark">{userInfo.introduction}</span>{" "}
            </strong>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </div>
  );
};

UserDetails.propTypes = {
  /**
   * The user details object.
   */
  userDetails: PropTypes.object
};

UserDetails.defaultProps = {
  userDetails: {
    name: "Sierra Brooks",
    avatar: require("./../../images/avatars/0.jpg"),
    jobTitle: "Project Manager",
    performanceReportTitle: "Workload",
    performanceReportValue: 74,
    metaTitle: "Description",
    metaValue:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?"
  }
};

export default UserDetails;
