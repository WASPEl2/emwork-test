const express = require("express");
const router = express.Router();
const transactionController = require("../../../controllers/transaction");

router.get("/:month", transactionController.getTransactions);
router.post("/", transactionController.createTransaction);
router.put("/:id", transactionController.updateTransaction);
router.delete("/:id", transactionController.deleteTransaction);

module.exports = router;
