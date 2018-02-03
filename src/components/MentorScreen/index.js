import React from "react";
import MentorTable from "../MentorTable";
import Email from "../Email";
import SearchForm from "../SearchForm";

const MentorScreen = ({ mentors, mentorEmails, filters, refresh }) => (
  <div style={{ padding: "10px", borderBottom: "1px solid #d8d8d8" }}>
    <SearchForm filters={filters} />
    <MentorTable mentors={mentors} refresh={refresh} />
    <hr />
    <Email mentors={mentors} mentorEmails={mentorEmails} />
  </div>
);

export default MentorScreen;
