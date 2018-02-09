import React from "react";
import DealTable from "../DealTable";
import Email from "../Email";
import StudentSearchForm from "../StudentSearchForm";

const StudentScreen = ({ deals, dealEmails, filters, refresh }) => (
  <div style={{ padding: "10px", borderBottom: "1px solid #d8d8d8" }}>
    <StudentSearchForm filters={filters} />
    <DealTable deals={deals} refresh={refresh} />
    <hr />
    <Email deals={deals} dealEmails={dealEmails} emailType="student" />
  </div>
);

export default StudentScreen;
