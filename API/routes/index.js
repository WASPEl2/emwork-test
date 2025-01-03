const express = require("express");
const router = express.Router();
const transactionRoutes = require("./API/transactions");
const reportRoutes = require("./API/reports");

router.use("/transactions", transactionRoutes);
router.use("/reports", reportRoutes);

module.exports = router;
