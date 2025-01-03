import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASEURL || "http://localhost:3001/api";

export const createTransaction = async (transactionData) => {
  try {
    const response = await axios.post(
      `${API_URL}/transactions`,
      transactionData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
};

export const getTransactionsByMonth = async (month) => {
  try {
    const response = await axios.get(`${API_URL}/transactions/${month}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

export const getReportByMonth = async (month) => {
  try {
    const response = await axios.get(`${API_URL}/reports/${month}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching report:", error);
    throw error;
  }
};

export const deleteTransaction = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/transactions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
};

export const updateTransaction = async (id, updatedData) => {
  try {
    const response = await axios.put(
      `${API_URL}/transactions/${id}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw error;
  }
};
