import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Nav, NavItem} from "shards-react";
import { Link } from "react-router-dom";

const MainFooter = ({ contained, menuItems, copyright }) => (
  <footer className="main-footer d-flex p-2 px-3 bg-white border-top">
    <Container fluid={contained}>
      <Row>
        <Nav>
          {menuItems.map((item, idx) => (
            <NavItem key={idx}>
              <div className="nav-link">
                <Link to={item.to}>{item.title}</Link>
              </div>
            </NavItem>
          ))}
        </Nav>
        <span className="copyright ml-auto my-auto mr-2">{copyright}</span>
      </Row>
    </Container>
  </footer>
);

MainFooter.propTypes = {
  /**
   * Whether the content is contained, or not.
   */
  contained: PropTypes.bool,
  /**
   * The menu items array.
   */
  menuItems: PropTypes.array,
  /**
   * The copyright info.
   */
  copyright: PropTypes.string
};

MainFooter.defaultProps = {
  contained: false,
  copyright: "Copyright © 2018 DesignRevision",
  menuItems: [
    {
      title: "Home",
      to: "/"
    },
    {
      title: "About",
      to: "#"
    },
    {
      title: "Products",
      to: ""
    },
    {
      title: "Blog",
      to: ""
    }
  ]
};

export default MainFooter;
