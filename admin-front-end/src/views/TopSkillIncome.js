import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "./../components/common/PageTitle";
import TopReferrals from "./../components/common/TopReferrals";

const TopSkillIncome = ({ smallStats }) => (
  <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle title="Blog Overview" subtitle="Dashboard" className="text-sm-left mb-3" />
    </Row>

    <Row>     
      {/* Top Referrals */}
      <Col lg="3" md="12" sm="12" className="mb-4">
        <TopReferrals />
      </Col>
    </Row>
  </Container>
);

export default TopSkillIncome;
