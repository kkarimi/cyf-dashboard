import React, { Component } from "react";
import { Container, Row } from "reactstrap";

import "./App.css";

import Header from "../Header";
import Footer from "../Footer";

import MentorScreen from "../MentorScreen";
import StudentScreen from "../StudentScreen";

import { getMentors } from "../../helpers/pipedrive/mentors";
import { getStudents } from "../../helpers/pipedrive/students";
import { MENTORS, STUDENTS } from "../../helpers/pipedrive/constants";

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
  mentorCity: "London",
  studentCity: "London",
  searchType: "Mentor",
  mentorStage: MENTORS.status.ALL,
  mentorName: "",
  studentStage: STUDENTS.status.ALL,
  studentName: "",
  mentors: [],
  students: []
};

class Main extends Component {
  state = initialSearchState;

  refreshStudents = () => {
    const { studentCity, studentStage, studentName } = this.state;
    console.info("reffing students");
    getStudents(studentCity, studentStage, studentName).then(students => {
      console.table(students);
      this.setState({
        students: students ? students : []
      });
    });
  };

  refreshMentors = (city, stage, name) => {
    // const { mentorCity, mentorStage, mentorName } = this.state;
    console.info("reffing mentors", city, stage, name);
    getMentors(city, stage, name).then(mentors => {
      this.setState({
        mentors: mentors ? mentors : []
      });
    });
  };

  async componentDidMount() {
    const { mentorCity, mentorStage, mentorName } = this.state;

    console.info(
      `mentorCity: ${mentorCity}, mentorStage: ${mentorStage}, mentorName: ${mentorName}`
    );
    this.refreshMentors(mentorCity, mentorStage, mentorName);
  }

  changeMentorStage = e => {
    const stage = e.target.value;
    const { mentorCity, mentorName } = this.state;
    console.info(stage);

    this.setState(
      {
        mentorStage: stage
      },
      () => this.refreshMentors(mentorCity, stage, mentorName)
    );
  };

  changeMentorCity = e => {
    const city = e.target.value;

    const { mentorStage, mentorName } = this.state;

    console.info(city);
    return this.setState({ mentorCity: city }, () => {
      return this.refreshMentors(city, mentorStage, mentorName);
    });
  };

  changeMentorName = name => {
    const { mentorStage, mentorCity } = this.state;
    const mentorName = name;
    this.setState({ mentorName: name }, () =>
      this.refreshMentors(mentorCity, mentorStage, mentorName)
    );
  };

  changeStudentStage = e => {
    const studentStage = e.target.value;
    const { studentCity, studentName } = this.state;
    this.setState(
      {
        studentStage: studentStage
      },
      () => this.refreshStudents(studentCity, studentStage, studentName)
    );
  };

  changeStudentCity = e => {
    const studentCity = e.target.value;
    const { studentStage, studentName } = this.state;
    return this.setState({ studentCity: studentCity }, () => {
      return this.refreshStudents(studentCity, studentStage, studentName);
    });
  };

  changeStudentName = e => {
    const studentName = e.target.value;
    const { studentStage, studentCity } = this.state;
    this.setState({ studentName: studentName }, () =>
      this.refreshStudents(studentCity, studentStage, studentName)
    );
  };

  changeScreen = () => {
    this.refreshMentors();
    this.refreshStudents();
  };

  render() {
    const { mentors, students } = this.state;

    const mentorFilterActions = {
      city: this.changeMentorCity,
      stage: this.changeMentorStage,
      name: this.changeMentorName
    };
    const studentFilterActions = {
      city: this.changeStudentCity,
      stage: this.changeStudentStage,
      name: this.changeStudentName
    };
    const studentFilters = {
      name: this.state.studentName,
      stage: this.state.studentStage,
      city: this.state.studentCity
    };
    const mentorFilters = {
      name: this.state.mentorName,
      stage: this.state.mentorStage,
      city: this.state.mentorCity
    };

    return (
      <div className="box">
        <h3>Email Dashboard</h3>
        <br />
        <FormTabs
          mentorScreen={
            <MentorScreen
              deals={mentors}
              filterActions={mentorFilterActions}
              filters={mentorFilters}
            />
          }
          studentScreen={
            <StudentScreen
              deals={students}
              filterActions={studentFilterActions}
              filters={studentFilters}
            />
          }
          refreshMentors={this.refreshMentors}
          refreshStudents={this.refreshStudents}
        />
      </div>
    );
  }
}

export default App;
