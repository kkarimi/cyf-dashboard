import React from "react";
import { Col, Row } from "reactstrap";

import { ScaleLoader } from "react-spinners";

const LoadingSpinner = () => (
  <Row>
    <Col lg={5} />
    <Col lg={5} id="interestRingLoader">
      <div className="ScaleLoader center-loading">
        <br />
        <br />
        <br />
        <br />
        <ScaleLoader
          color="#123abc"
          loading={true}
          size={100} /*the size of the spinner*/
        />
        <br />
        <br />
        <br />
        <br />
      </div>
    </Col>
    <Col lg={5} />
  </Row>
);

export default LoadingSpinner;
