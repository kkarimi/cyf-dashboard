import React from "react";
import DealTable from "../DealTable";
import Email from "../Email";
import SearchForm from "../SearchForm";

const MentorScreen = ({
  deals,
  mentorEmails,
  filters,
  filterActions,
  refresh
}) => (
  <div style={{ padding: "10px", borderBottom: "1px solid #d8d8d8" }}>
    <SearchForm filters={filters} filterActions={filterActions} />
    <DealTable deals={deals} refresh={refresh} />
    <hr />
    <Email deals={deals} dealEmails={mentorEmails} emailType="mentor" />
  </div>
);

export default MentorScreen;
