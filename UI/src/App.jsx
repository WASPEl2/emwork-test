import React, { useState } from "react";
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
  const [transactionToEdit, setTransactionToEdit] = useState(null);

  const {
    transactions,
    report,
    addTransaction,
    updateTransaction,
    removeTransaction,
    error,
  } = useTransactions(monthYear);

  const handleMonthChange = (e) => {
    const newMonthYear = e.target.value;
    setMonthYear(newMonthYear);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setTransactionToEdit(null);
  };

  const handleEditTransaction = (id) => {
    const transaction = transactions.find((t) => t.id === id);
    setTransactionToEdit(transaction);
    setShowModal(true);
  };

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

      <TransactionForm
        showModal={showModal}
        toggleModal={toggleModal}
        month={monthYear}
        addTransaction={addTransaction}
        updateTransaction={updateTransaction}
        transactionToEdit={transactionToEdit}
      />

      <TransactionList
        transactions={transactions}
        removeTransaction={removeTransaction}
        editTransaction={handleEditTransaction}
      />
      <Report report={report} />
    </div>
  );
};

export default App;
