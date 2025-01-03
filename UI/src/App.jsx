import React, { useState, useEffect } from "react";
import { useTransactions } from "./hooks/useTransactions";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Report from "./components/Report";
import Navbar from "./components/Navbar";

const App = () => {
  const [monthYear, setMonthYear] = useState(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  });
  const [showModal, setShowModal] = useState(false);

  const { transactions, report, addTransaction, removeTransaction, error } =
    useTransactions(monthYear);

  const handleMonthChange = (e) => {
    const newMonthYear = e.target.value;
    setMonthYear(newMonthYear);
  };

  const toggleModal = () => setShowModal(!showModal);

  return (
    <div className="m-3">
      <Navbar />
      <div className="d-flex justify-content-between m-3">
        <div>
          <label>Select Month</label>
          <input type="month" value={monthYear} onChange={handleMonthChange} />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <button className="btn btn-primary" onClick={toggleModal}>
          Add Transaction
        </button>
      </div>

      {/* Modal */}
      <TransactionForm
        showModal={showModal}
        toggleModal={toggleModal}
        month={monthYear}
        addTransaction={addTransaction}
      />

      <TransactionList
        transactions={transactions}
        removeTransaction={removeTransaction}
      />
      <Report report={report} />
    </div>
  );
};

export default App;
