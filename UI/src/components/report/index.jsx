import React from "react";

const Report = ({ report }) => {
  if (!report) return null;

  return (
    <div className="d-flex justify-content-end gap-3">
      <p>Total Income: {report.total_income}</p>
      <p>Total Expense: {report.total_expense}</p>
      <p>Balance: {report.balance}</p>
    </div>
  );
};

export default Report;
