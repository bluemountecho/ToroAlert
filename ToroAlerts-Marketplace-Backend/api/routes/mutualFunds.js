const express = require("express");
const router = express.Router();
const mutualFundsController = require("../controllers/mutualFunds_controller");

router.get("/match/:ticker?", mutualFundsController.matchMutualFund);

module.exports = router;
