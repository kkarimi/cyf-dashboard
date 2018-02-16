import React from "react";
import DealTable from "../DealTable";
import Email from "../Email";
import SearchForm from "../SearchForm";
import LoadingSpinner from "../LoadingSpinner";

const MentorScreen = ({
  deals,
  mentorEmails,
  filters,
  filterActions,
  searching,
  refresh
}) => (
  <div style={{ padding: "10px", borderBottom: "1px solid #d8d8d8" }}>
    <SearchForm filters={filters} filterActions={filterActions} />
    {searching ? (
      <LoadingSpinner />
    ) : (
      <div>
        <DealTable deals={deals} searching={searching} refresh={refresh} />
        <hr />
        <Email deals={deals} emailType="mentor" />
      </div>
    )}
  </div>
);

export default MentorScreen;
