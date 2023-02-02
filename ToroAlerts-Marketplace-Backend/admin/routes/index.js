const express = require("express");
const router = express.Router();

router.use("/pull", require("./pullData"));

router.use("/push", require("./pushData"));

module.exports = router;
