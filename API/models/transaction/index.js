const db = require("../../DBConnector");

const getTransactionsByMonth = (month) => {
  const [year, monthNumber] = month.split("-");
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM transactions WHERE YEAR(transaction_date) = ? AND MONTH(transaction_date) = ?`;
    db.query(sql, [year, monthNumber], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const createTransaction = (transaction) => {
  return new Promise((resolve, reject) => {
    const { type, title, amount, transaction_date } = transaction;
    const sql = `INSERT INTO transactions (type, title, amount, transaction_date) VALUES (?, ?, ?, ?)`;
    db.query(sql, [type, title, amount, transaction_date], (err, result) => {
      if (err) return reject(err);
      resolve(result.insertId);
    });
  });
};

const updateTransaction = (id, transaction) => {
  return new Promise((resolve, reject) => {
    const { type, title, amount, transaction_date } = transaction;
    const sql = `UPDATE transactions SET type = ?, title = ?, amount = ?, transaction_date = ? WHERE id = ?`;
    db.query(sql, [type, title, amount, transaction_date, id], (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

const deleteTransaction = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM transactions WHERE id = ?`;
    db.query(sql, [id], (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

const getSummaryByMonth = (month) => {
  const [year, monthNumber] = month.split("-");
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense,
        (SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) - SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END)) AS balance
      FROM transactions
      WHERE  YEAR(transaction_date) = ? AND MONTH(transaction_date) = ?
    `;
    db.query(sql, [year, monthNumber], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

module.exports = {
  getTransactionsByMonth,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getSummaryByMonth,
};
