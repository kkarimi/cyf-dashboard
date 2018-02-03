import React, { Component } from "react";
import { Container, Row } from "reactstrap";

import "./App.css";

import Header from "../Header";
import Footer from "../Footer";

import MentorScreen from "../MentorScreen";

import { getMentors } from "../../helpers/pipedrive/mentors";
import { MENTORS } from "../../helpers/pipedrive/constants";
import FormTabs from "./FormTabs";

const App = () => (
  <div>
    <Header />
    <Container>
      <Row>
        <Main />
      </Row>
    </Container>
    <Footer />
  </div>
);

const initialSearchState = {
  city: "All",
  searchType: "Mentor",
  stage: MENTORS.status.ALL,
  name: "",
  mentors: [],
  students: ""
};

class Main extends Component {
  state = initialSearchState;

  refreshMentors = (city, stage, name) => {
    getMentors(city, stage, name).then(mentors => {
      this.setState({
        mentors: mentors
      });
    });
  };

  async componentDidMount() {
    this.refreshMentors(this.state.city, this.state.stage);
  }

  filter = e => {};

  changeState = e => {
    const stage = e.target.value;
    const { city, name } = this.state;
    this.setState(
      {
        stage: stage
      },
      () => this.refreshMentors(city, stage, name)
    );
  };

  changeCity = e => {
    const city = e.target.value;
    const { stage, name } = this.state;
    return this.setState({ city: city }, () => {
      return this.refreshMentors(city, stage, name);
    });
  };

  changeName = e => {
    const name = e.target.value;
    const { stage, city } = this.state;
    this.setState({ name: name }, () => this.refreshMentors(city, stage, name));
  };

  mentorEmails = () => {
    const { mentors } = this.state;
    return mentors.map(mentor => mentor.email);
  };

  render() {
    const { mentors } = this.state;
    const filters = {
      city: this.changeCity,
      stage: this.changeState,
      name: this.changeName
    };
    const mentorEmails = this.mentorEmails();

    return (
      <div className="box">
        <h3>Email Dashboard</h3>
        <br />
        <FormTabs
          mentorScreen={
            <MentorScreen
              mentors={mentors}
              mentorEmails={mentorEmails}
              filters={filters}
              refresh={this.refreshMentors}
            />
          }
        />
      </div>
    );
  }
}

export default App;
