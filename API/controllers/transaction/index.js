const transactionModel = require("../../models/transaction");

const getTransactions = async (req, res) => {
  try {
    const month = req.params.month;
    const transactions = await transactionModel.getTransactionsByMonth(month);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTransaction = async (req, res) => {
  try {
    const transaction = req.body;
    const id = await transactionModel.createTransaction(transaction);
    res.json({ id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const id = req.params.id;
    const transaction = req.body;
    await transactionModel.updateTransaction(id, transaction);
    res.json({ message: "Transaction updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const id = req.params.id;
    await transactionModel.deleteTransaction(id);
    res.json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
