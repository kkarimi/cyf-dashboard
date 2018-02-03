import React from "react";
import { Container, Row, Col } from "reactstrap";

const Footer = () => (
  <Container>
    <Row>
      <Col>
        <span className="text-center">
          {" "}
          &copy; <a href="https://codeyourfuture.io">Code Your Future</a> 2018.
        </span>
      </Col>
    </Row>
  </Container>
);

export default Footer;
