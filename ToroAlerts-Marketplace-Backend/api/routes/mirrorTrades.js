const express = require("express");
const router = express.Router();
const mirrorTradesCryptoController = require("../controllers/mirrorTradesCrypto_controller");
router.post(
  "/crypto/validateApiKeys",
  mirrorTradesCryptoController.validateApiKeysAndGenerateMirrorTrade
);

router.post(
  "/crypto/details/:operationType",
  mirrorTradesCryptoController.getMirrorTradeDetails
);

router.post("/crypto/update", mirrorTradesCryptoController.updateMirrorTrade);

router.post(
  "/crypto/submitForLease",
  mirrorTradesCryptoController.submitForLease
);

router.post("/crypto/match", mirrorTradesCryptoController.matchMirrorTrades);
module.exports = router;
