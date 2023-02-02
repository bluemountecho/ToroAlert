const express = require("express");
const router = express.Router();
const alertsController = require("../controllers/alert_controller");

router.get("/", alertsController.getAlertsOnAlgorithms);

module.exports = router;
