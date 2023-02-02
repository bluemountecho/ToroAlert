const express = require("express");
const router = express.Router();
const {
  toroAlertUserJWTAuthenticator,
} = require("../middlewares/toroAlertUsersAuth");

router.use(
  "/mutualFunds",
  toroAlertUserJWTAuthenticator,
  require("./mutualFunds")
);
router.use("/algorithm", toroAlertUserJWTAuthenticator, require("./algorithm"));
router.use("/trigger", toroAlertUserJWTAuthenticator, require("./triggers"));
router.use("/user", toroAlertUserJWTAuthenticator, require("./user"));
router.use("/stock", toroAlertUserJWTAuthenticator, require("./stock"));
router.use("/alerts", toroAlertUserJWTAuthenticator, require("./alerts"));
router.use(
  "/mirrorTrades",
  toroAlertUserJWTAuthenticator,
  require("./mirrorTrades")
);
router.use("/public", require("./openApi"));

module.exports = router;
