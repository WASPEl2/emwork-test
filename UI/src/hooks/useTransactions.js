import { useState, useEffect } from "react";
import {
  getTransactionsByMonth,
  getReportByMonth,
  createTransaction,
  deleteTransaction,
  updateTransaction,
} from "../controllers/transaction";

export const useTransactions = (month) => {
  const [transactions, setTransactions] = useState([]);
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTransactions = await getTransactionsByMonth(month);
        setTransactions(fetchedTransactions);

        const fetchedReport = await getReportByMonth(month);
        setReport(fetchedReport);
      } catch (error) {
        setError("Failed to fetch data");
      }
    };

    fetchData();
  }, [month]);

  const addTransaction = async (transactionData) => {
    try {
      const newTransaction = await createTransaction(transactionData);
      setTransactions((prev) => [...prev, newTransaction]);
    } catch (error) {
      setError("Failed to create transaction");
    }
  };

  const removeTransaction = async (id) => {
    try {
      await deleteTransaction(id);
      setTransactions((prev) =>
        prev.filter((transaction) => transaction.id !== id)
      );
    } catch (error) {
      setError("Failed to delete transaction");
    }
  };

  const editTransaction = async (id, updatedData) => {
    try {
      const updatedTransaction = await updateTransaction(id, updatedData);
      setTransactions((prev) =>
        prev.map((transaction) =>
          transaction.id === id ? updatedTransaction : transaction
        )
      );
    } catch (error) {
      setError("Failed to update transaction");
    }
  };

  return {
    transactions,
    report,
    addTransaction,
    removeTransaction,
    editTransaction,
    error,
  };
};
