const express = require("express");
const router = express.Router();
const backtestController = require("../controllers/backtesting_controller");
const leaseController = require("../controllers/lease_controller");
const mirrorTradeController = require("../controllers/mirrorTrade_controller");
router.get("/backtestData", backtestController.getBacktestData);

router.get("/leaseData", leaseController.getLeaseStatusData);

router.get("/mirrorTrades", mirrorTradeController.pullMirrorTrades);

module.exports = router;
