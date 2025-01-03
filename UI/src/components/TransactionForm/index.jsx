import React, { useState, useEffect } from "react";
import { TRANSACTION_TYPES } from "../../constants/types";

const TransactionForm = ({
  showModal,
  toggleModal,
  month,
  addTransaction,
  updateTransaction,
  transactionToEdit,
}) => {
  const [type, setType] = useState(TRANSACTION_TYPES.INCOME);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionDate, setTransactionDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    if (transactionToEdit) {
      setType(transactionToEdit.type);
      setTitle(transactionToEdit.title);
      setAmount(transactionToEdit.amount);
      setTransactionDate(transactionToEdit.transaction_date);
    } else {
      resetForm();
    }
  }, [transactionToEdit]);

  const resetForm = () => {
    setType(TRANSACTION_TYPES.INCOME);
    setTitle("");
    setAmount("");
    setTransactionDate(new Date().toISOString().split("T")[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (transactionToEdit) {
      updateTransaction({
        ...transactionToEdit,
        type,
        title,
        amount,
        transaction_date: transactionDate,
      });
    } else {
      addTransaction({
        type,
        title,
        amount,
        transaction_date: transactionDate,
      });
    }
    resetForm();
    toggleModal();
  };

  return (
    <div
      className={`modal fade ${showModal ? "show" : ""}`}
      tabIndex="-1"
      style={{ display: showModal ? "block" : "none" }}
      aria-hidden={!showModal}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {transactionToEdit ? "Update Transaction" : "Add Transaction"}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={toggleModal}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Type:</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="form-select"
                >
                  <option value={TRANSACTION_TYPES.INCOME}>Income</option>
                  <option value={TRANSACTION_TYPES.EXPENSE}>Expense</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Amount:</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Date:</label>
                <input
                  type="date"
                  value={transactionDate}
                  onChange={(e) => setTransactionDate(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={toggleModal}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                {transactionToEdit ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TransactionForm;
