import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Col } from "reactstrap";

const selectStyle = {
  width: "200px"
};

export default class SearchForm extends Component {
  state = {};
  _handleKeyPress = e => {
    e.preventDefault();
    // if (e.key === "Enter") {
    // debugger;
    this.props.filterActions.name(e);
  };
  _handleNameChange = e => {
    e.preventDefault();
    const name = e.target.value;

    this.props.filterActions.name(name);
  };
  render() {
    const { filters, filterActions } = this.props;
    return (
      <div>
        <br />
        <h4>Search</h4>
        <Form inline disabled>
          <FormGroup inline>
            <Label for="city" sm={2}>
              City
            </Label>
            <Col sm={20}>
              <Input
                value={filters.city}
                type="select"
                name="select"
                id="city"
                onChange={filterActions.city}
                style={selectStyle}
              >
                <option>London</option>
                <option>Manchester</option>
                <option>Glasgow</option>
                <option>General</option>
                <option>Other</option>
                <option>All</option>
              </Input>
            </Col>
          </FormGroup>
          <FormGroup inline>
            <Label for="stage" sm={2}>
              Stage
            </Label>
            <Col sm={20}>
              <Input
                type="select"
                name="select"
                id="stage"
                value={filters.stage}
                onChange={filterActions.stage}
                style={selectStyle}
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
            <Label for="name" sm={2}>
              Name
            </Label>
            <Col sm={20}>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder=""
                onChange={this._handleNameChange}
                onBlur={this._handleNameChange}
                value={filters.name}
              />
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
