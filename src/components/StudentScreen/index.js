import React from "react";
import DealTable from "../DealTable";
import Email from "../Email";
import StudentSearchForm from "../StudentSearchForm";

const StudentScreen = ({
  deals,
  dealEmails,
  filters,
  filterActions,
  refresh
}) => (
  <div style={{ padding: "10px", borderBottom: "1px solid #d8d8d8" }}>
    <StudentSearchForm filters={filters} filterActions={filterActions} />
    <DealTable deals={deals} refresh={refresh} />
    <hr />
    <Email deals={deals} emailType="student" />
  </div>
);

export default StudentScreen;
