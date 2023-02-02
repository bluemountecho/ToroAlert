const express = require("express");
const router = express.Router();
const backtestController = require("../controllers/backtesting_controller");
const leaseController = require("../controllers/lease_controller");
const alertController = require("../controllers/alerts_controller");
const mutualFundsController = require("../controllers/mutualfunds_controller");
const stocksController = require("../controllers/stocks_controller");
const mirrorTradeController = require("../controllers/mirrorTrade_controller");

router.post("/backtestData", backtestController.postBacktestData);
router.post("/leaseData", leaseController.postLeaseStatusData);
router.post("/alerts", alertController.pushAlerts);
router.post("/mutualFunds", mutualFundsController.updateMutualFunds);
router.post("/stocks", stocksController.updateStocks);
router.post("/mirrorTrades", mirrorTradeController.pushMirrorTradeData);

module.exports = router;
