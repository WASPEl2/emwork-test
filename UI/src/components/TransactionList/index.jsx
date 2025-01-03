import React from "react";

const TransactionList = ({
  transactions,
  removeTransaction,
  editTransaction,
}) => {
  return (
    <div>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Title</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.type}</td>
              <td>{transaction.title}</td>
              <td>{transaction.amount}</td>

              {/* fix date format to DD/MM/YYY for all device */}
              <td>
                {new Date(transaction.transaction_date).toLocaleDateString(
                  "en-GB"
                )}
              </td>
              <td>
                {new Date(transaction.created_at).toLocaleDateString("en-GB")}
              </td>
              <td>
                {new Date(transaction.updated_at).toLocaleDateString("en-GB") ||
                  "N/A"}
              </td>
              <td>
                <button
                  className="btn btn-info btn-sm text-white me-2"
                  onClick={() => editTransaction(transaction.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeTransaction(transaction.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
