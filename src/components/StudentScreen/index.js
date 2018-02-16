import React from "react";
import DealTable from "../DealTable";
import Email from "../Email";
import StudentSearchForm from "../StudentSearchForm";
import LoadingSpinner from "../LoadingSpinner";

const StudentScreen = ({
  deals,
  dealEmails,
  filters,
  filterActions,
  searching,
  refresh
}) => (
  <div style={{ padding: "10px", borderBottom: "1px solid #d8d8d8" }}>
    <StudentSearchForm filters={filters} filterActions={filterActions} />
    {searching ? (
      <LoadingSpinner />
    ) : (
      <div>
        <DealTable deals={deals} refresh={refresh} />
        <hr />
        <Email deals={deals} emailType="student" />
      </div>
    )}
  </div>
);

export default StudentScreen;
