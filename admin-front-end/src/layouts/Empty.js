import React from "react";
import { Container} from "shards-react";


const EmptyLayout = ({ children}) => (
  <Container fluid>
    {children}
  </Container>
);

export default EmptyLayout;
