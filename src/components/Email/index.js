import React, { Component } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Tooltip,
  Collapse,
  Label,
  Input
} from "reactstrap";

import EmailEditor from "./editor";
import { emails } from "./templates";

import { sendEmail } from "../../helpers/email";

export default class Email extends Component {
  state = {
    collapse: true,
    editorState: "",
    tooltipOpen: false
  };

  toggleCollapse = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  onChange = e => {
    this.setState({ editorState: e.target.value });
  };

  updateText = text => {
    this.setState({
      editorState: text
    });
  };

  welcomeNewStudent = () => {
    const content = emails.london.new_students;
    this.updateText(content);
  };
  welcomeNewMentor = () => {
    const content = emails.london.new_students;
    this.updateText(content);
  };
  tooltipToggle = () => {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  };

  renderMentorEmails = () => {
    const { mentors, mentorEmails } = this.props;
    return (
      <span key={mentors.length}>
        <span id="mentorEmailsTip">{mentors.length} mentors</span>
        <Tooltip
          placement="right"
          isOpen={this.state.tooltipOpen}
          target="mentorEmailsTip"
          toggle={this.tooltipToggle}
        >
          {mentorEmails.join(",")}
        </Tooltip>
      </span>
    );
  };

  sendEmail = () => {
    const { mentors } = this.props;
    const { editorState } = this.state;
    const promises = mentors.map(mentor => sendEmail(mentor, editorState));
    return Promise.all(promises);
  };

  render() {
    return (
      <div className="panel-box">
        <Button
          outline
          color="success"
          onClick={this.toggleCollapse}
          style={{ marginBottom: "0.5rem" }}
          size="sm"
        >
          {this.state.collapse === true ? "+" : "-"}
        </Button>
        {"  "}
        <span style={{ padding: "10px" }}>
          <strong>Email</strong>
        </span>
        <Collapse isOpen={!this.state.collapse}>
          <Container>
            <Row>
              <Col lg="12" xs="6">
                <Label for="from" sm={2}>
                  <strong>From:</strong>
                </Label>
                mentors@codeyourfuture <br />
                <Label for="to" sm={2}>
                  <strong>To:</strong>
                </Label>
                {this.renderMentorEmails()} <br />
                <Label for="templates" sm={2}>
                  <strong>Templates:</strong>
                </Label>
                <br />
                <ul>
                  <li>
                    <div className="link" onClick={this.welcomeNewStudent}>
                      Welcome New Student
                    </div>
                  </li>
                </ul>
                <Label for="checkbox2" sm={2}>
                  <strong>Ops:</strong>
                </Label>
                <Label check>
                  <Input type="checkbox" id="checkbox2" /> Move to contacted
                  when done
                </Label>
                <EmailEditor
                  editorState={this.state.editorState}
                  updateText={this.updateText}
                  onChange={this.onChange}
                />
                <br />
                <Button color="success" onClick={this.sendEmail}>
                  Send
                </Button>
              </Col>
            </Row>
          </Container>
        </Collapse>
        <br />
      </div>
    );
  }
}