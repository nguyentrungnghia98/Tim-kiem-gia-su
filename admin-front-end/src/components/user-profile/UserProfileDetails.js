import React from "react";
import PropTypes from "prop-types";

import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Progress
} from "shards-react";

const UserProfileDetails = (props) => {

  const {userInfo, userDetails} = props;
 
  return(<div>
  <Card small className="mb-4 pt-3">
    <CardHeader className="border-bottom text-center">
      <div className="mb-3 mx-auto">
        <img
          className="rounded-circle"
          src={userInfo.avatar}
          alt={userInfo.fullName}
          width="150"
        />
      </div>
      <h4 className="mb-2">{userInfo.fullName}</h4>
      <span className="text-success d-block mb-2">{userInfo.role}</span>
      <Button pill outline size="sm" className="mb-2">
        <i className="material-icons mr-1">add_a_photo</i> Chỉnh sửa avatar
      </Button>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="px-4">
        <div className="progress-wrapper">
          <strong className="text-muted d-block mb-2">
            {userDetails.performanceReportTitle}
          </strong>
          <Progress
            className="progress-sm"
            value={userDetails.performanceReportValue}
          >
            <span className="progress-value">
              {userDetails.performanceReportValue}%
            </span>
          </Progress>
        </div>
      </ListGroupItem>
    </ListGroup>
  </Card>
</div>
)};

UserProfileDetails.propTypes = {
  /**
   * The user details object.
   */
  userDetails: PropTypes.object
};

UserProfileDetails.defaultProps = {
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

export default UserProfileDetails;
