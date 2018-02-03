import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Col } from "reactstrap";

export default class SearchForm extends Component {
  state = {};
  _handleKeyPress = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.props.filters.name(e);
    }
  };
  render() {
    const { filters } = this.props;
    return (
      <div>
        <br />
        <h4>Search</h4>
        <Form inline disabled>
          <FormGroup inline>
            <Label for="exampleSelect" sm={2}>
              City
            </Label>
            <Col sm={20}>
              <Input
                type="select"
                name="select"
                id="exampleSelect"
                onChange={filters.city}
              >
                <option>All</option>
                <option>London</option>
                <option>Manchester</option>
                <option>Glasgow</option>
                <option>General</option>
                <option>Other</option>
              </Input>
            </Col>
          </FormGroup>
          <FormGroup inline>
            <Label for="exampleSelect" sm={2}>
              Stage
            </Label>
            <Col sm={20}>
              <Input
                type="select"
                name="select"
                id="exampleSelect"
                onChange={filters.stage}
              >
                <option>All</option>
                <option>Signed Up</option>
                <option>Contacted</option>
                <option>Motivated</option>
                <option>Emailed</option>
                <option>Intro Chat</option>
                <option>Attended Class</option>
                <option>Potential Module Organisers</option>
              </Input>
            </Col>
          </FormGroup>
          <FormGroup inline>
            <Label for="exampleName" sm={2}>
              Name
            </Label>
            <Col sm={20}>
              <Input
                type="name"
                name="name"
                id="name"
                placeholder=""
                onKeyPress={this._handleKeyPress}
              />
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
