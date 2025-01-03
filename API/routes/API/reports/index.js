const express = require("express");
const router = express.Router();
const reportController = require("../../../controllers/report");

router.get("/:month", reportController.getReport);

module.exports = router;
