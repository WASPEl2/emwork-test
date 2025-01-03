import React, { useState } from "react";
import { TRANSACTION_TYPES } from "../../constants/types";

const TransactionForm = ({ showModal, toggleModal, month, addTransaction }) => {
  const [type, setType] = useState(TRANSACTION_TYPES.INCOME);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionDate, setTransactionDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      type,
      title,
      amount,
      transaction_date: transactionDate,
    });
    setTitle("");
    setAmount("");
    setTransactionDate("");
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
            <h5 className="modal-title">Add Transaction</h5>
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
              <label>
                Type:
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="form-select"
                >
                  <option value={TRANSACTION_TYPES.INCOME}>Income</option>
                  <option value={TRANSACTION_TYPES.EXPENSE}>Expense</option>
                </select>
              </label>
              <label>
                Title:
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-control"
                />
              </label>
              <label>
                Amount:
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="form-control "
                />
              </label>
              <label>
                Date:
                <input
                  type="date"
                  value={transactionDate}
                  onChange={(e) => setTransactionDate(e.target.value)}
                  className="form-control"
                />
              </label>
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
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TransactionForm;
