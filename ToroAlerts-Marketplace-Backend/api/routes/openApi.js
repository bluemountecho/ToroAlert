const express = require("express");
const router = express.Router();
const openApiController = require("../controllers/openApi_controller");

router.get(
  "/topPerformingAlgorithms",
  openApiController.getTopPerformingAlgorithms
);

module.exports = router;
