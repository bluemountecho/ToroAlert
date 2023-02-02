const express = require("express");
const router = express.Router();
const StockController = require("../controllers/stock_controller");

router.get("/all", StockController.getAllTickers);
router.get("/match/:tickerId", StockController.getStockData);
module.exports = router;
