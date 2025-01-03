const transactionModel = require("../../models/transaction");

const getReport = async (req, res) => {
  try {
    const month = req.params.month;
    const summary = await transactionModel.getSummaryByMonth(month);
    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getReport,
};
