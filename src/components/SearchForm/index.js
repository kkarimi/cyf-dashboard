import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Col } from "reactstrap";

export default class SearchForm extends Component {
  state = {
    name: ""
  };
  _handleKeyPress = e => {
    if (e) {
      console.info(e);
    }
    if (e.key === "Enter") {
      e.preventDefault();
      debugger;
      this.props.filters.name(e);
    }
  };
  _handleNameChange = e => {
    e.preventDefault();
    const name = e.target.value;
    console.info(name);
    debugger;
    this.setState({ name: name });
    this.props.filters.name(name);
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
                onBlur={filters.name}
                onKeyPress={this._handleKeyPress}
                value={filters.name}
              />
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
