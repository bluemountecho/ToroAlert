const express = require("express");
const router = express.Router();
const toroMarketPlaceUserController = require("../controllers/user_controller");
router.post(
  "/manageFavourite",
  toroMarketPlaceUserController.manageUserFavouriteAlgorithm
);
router.post(
  "/manageFavouriteMirrorTrades",
  toroMarketPlaceUserController.manageUserFavouriteMirrorTrades
);
router.get(
  "/allFavourite",
  toroMarketPlaceUserController.getAllFavouriteAlgorithms
);
router.get(
  "/allFavouriteMirrorTrades",
  toroMarketPlaceUserController.getAllFavouriteMirrorTrades
);
router.post(
  "/manageSubscription",
  toroMarketPlaceUserController.manageUserSubscriptionAlgorithm
);
router.post(
  "/manageSubscriptionMirrorTrades",
  toroMarketPlaceUserController.manageUserSubscriptionMirrorTrade
);
router.get(
  "/allSubscriptions",
  toroMarketPlaceUserController.getAllSubscribedAlgorithms
);
router.get(
  "/allSubscriptionsMirrorTrades",
  toroMarketPlaceUserController.getAllSubscribedMirrorTrades
);

router.post(
  "/manageBearBullPreferences",
  toroMarketPlaceUserController.manageBearBullPreferences
);

module.exports = router;
