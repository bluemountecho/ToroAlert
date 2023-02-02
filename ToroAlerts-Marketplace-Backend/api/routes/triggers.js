const express = require("express");
const router = express.Router();
const triggerController = require("../controllers/trigger_controller");

router.post("/add", triggerController.addTrigger);
router.post("/remove", triggerController.removeTrigger);

module.exports = router;
