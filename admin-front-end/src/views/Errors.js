import React from "react";
import { Container, Button } from "shards-react";

const Errors = () => (
  <Container fluid className="main-content-container px-4 pb-4">
    <div className="error">
      <div className="error__content">
        <h2>404</h2>
        <p>Xin lỗi, không tìm thấy đường dẫn.</p>
        <Button pill onClick={() => window.location.href="/" }>&larr; Go Back</Button>
      </div>
    </div>
  </Container>
);

export default Errors;
