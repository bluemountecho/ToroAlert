const express = require("express");
const router = express.Router();
const AlgorithmController = require("../controllers/algorithm_controller");

router.post("/details/:operationType", AlgorithmController.getAlgorithmDetails);
router.post("/create", AlgorithmController.createAlgorithm);
router.post("/delete", AlgorithmController.deleteAlgorithm);
router.post("/match", AlgorithmController.matchAlgorithm);
router.post("/submitForLease", AlgorithmController.submitForLease);
router.post("/backtest", AlgorithmController.backtestAlgorithm);
router.post("/update/:operationType", AlgorithmController.updateAlgorithm);
router.post(
  "/stock/:operationType",
  AlgorithmController.algorithmStocksManager
);

module.exports = router;
