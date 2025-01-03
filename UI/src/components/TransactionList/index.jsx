import React from "react";

const TransactionList = ({ transactions, removeTransaction }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Type</th>
          <th>Title</th>
          <th>Amount</th>
          <th>Date</th>
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
            <td>{transaction.transaction_date}</td>
            <td>
              <button onClick={() => removeTransaction(transaction.id)}>
                Delete
              </button>
              {/* You could add edit functionality here */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionList;
