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
  mentorCity: "All",
  studentCity: "All",
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
    const { mentorCity, mentorStage, mentorName } = this.state;
    console.info("reffing mentors");
    getMentors(mentorCity, mentorStage, mentorName).then(mentors => {
      this.setState({
        mentors: mentors ? mentors : []
      });
    });
  };

  async componentDidMount() {
    this.refreshMentors();
    this.refreshStudents();
  }

  filter = e => {};

  changeMentorStage = e => {
    const stage = e.target.value;
    const { mentorCity, mentorName } = this.state;
    this.setState(
      {
        mentorStage: stage
      },
      () => this.refreshMentors(mentorCity, stage, mentorName)
    );
  };

  changeMentorCity = e => {
    const city = e.target.value;
    const { stage, name } = this.state;
    return this.setState({ city: city }, () => {
      return this.refreshMentors(city, stage, name);
    });
  };

  changeMentorName = e => {
    const name = e.target.value;
    const { mentorStage, mentorCity } = this.state;
    this.setState({ name: name }, () =>
      this.refreshMentors(mentorCity, mentorStage, name)
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
    return this.setState({ studentCity: studentCity }, () => {
      return this.refreshStudents();
    });
  };

  changeStudentName = e => {
    const studentName = e.target.value;
    this.setState({ studentName: studentName }, () => this.refreshStudents());
  };

  mentorEmails = () => {
    const { mentors } = this.state;
    return mentors.map(mentor => mentor.email);
  };

  studentEmails = () => {
    const { students } = this.state;
    return students.map(student => student.email);
  };

  render() {
    const { mentors, students } = this.state;
    const mentorFilters = {
      city: this.changeMentorCity,
      stage: this.changeMentorStage,
      name: this.changeMentorName
    };
    const studentFilters = {
      city: this.changeStudentCity,
      stage: this.changeStudentStage,
      name: this.changeStudentName
    };
    const mentorEmails = this.mentorEmails();
    const studentEmails = this.studentEmails();

    return (
      <div className="box">
        <h3>Email Dashboard</h3>
        <br />
        <FormTabs
          mentorScreen={
            <MentorScreen
              deals={mentors}
              dealEmails={mentorEmails}
              filters={mentorFilters}
            />
          }
          studentScreen={
            <StudentScreen
              deals={students}
              dealEmails={studentEmails}
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
