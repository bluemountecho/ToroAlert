const AlgorithmModel = require("../models/algorithm");
const MarketplaceUserModel = require("../models/marketplaceUsers");
const MirrorTradesModel = require("../models/mirrorTrades");
const UserBearBullPreferencesModel = require("../models/userBearBullPref");
const { sanitize } = require("../utils/data-handlers");
const { CustomError } = require("../utils/error-handlers");
const manageUserFavouriteAlgorithm = async (req, res) => {
  try {
    const algorithmCode = sanitize(req.body.algorithmCode);
    const favourite = sanitize(req.body.favourite) === "true" ? true : false;
    const { algorithmObjectId } = await AlgorithmModel.doesAlgorithmExist(
      algorithmCode
    );
    const updateQuery = favourite
      ? { $addToSet: { favouriteAlgorithms: algorithmObjectId } }
      : { $pull: { favouriteAlgorithms: algorithmObjectId } };
    const { matchedCount, modifiedCount, upsertedCount } =
      await MarketplaceUserModel.updateOne(
        { email: req.user.email },
        updateQuery,
        {
          upsert: true,
        }
      );
    if (matchedCount + modifiedCount + upsertedCount === 0) {
      throw new CustomError("Failed to toggle favourite algorithm");
    }
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message:
        err.type === "custom_err" ? err.message : "Failed alter favourites",
    });
  }
};
const manageUserFavouriteMirrorTrades = async (req, res) => {
  try {
    const mirrorTradeCode = sanitize(req.body.mirrorTradeCode);
    const favourite = sanitize(req.body.favourite) === "true" ? true : false;
    const { mirrorTradeObjectId } =
      await MirrorTradesModel.doesMirrorTradeExist(mirrorTradeCode);
    const updateQuery = favourite
      ? { $addToSet: { favouriteMirrorTrades: mirrorTradeObjectId } }
      : { $pull: { favouriteMirrorTrades: mirrorTradeObjectId } };
    const { matchedCount, modifiedCount, upsertedCount } =
      await MarketplaceUserModel.updateOne(
        { email: req.user.email },
        updateQuery,
        {
          upsert: true,
        }
      );
    if (matchedCount + modifiedCount + upsertedCount === 0) {
      throw new CustomError("Failed to toggle favourite mirror trade");
    }
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message:
        err.type === "custom_err" ? err.message : "Failed alter favourites",
    });
  }
};
const manageUserSubscriptionAlgorithm = async (req, res) => {
  try {
    const algorithmCode = sanitize(req.body.algorithmCode);
    const subscribe = sanitize(req.body.subscribe) === "true" ? true : false;
    const algorithmUpdateQuery = subscribe
      ? {
          $addToSet: {
            usersSubscribed: req.user.email,
          },
        }
      : {
          $pull: {
            usersSubscribed: req.user.email,
          },
        };

    const algorithm = await AlgorithmModel.findOneAndUpdate(
      { code: algorithmCode },
      algorithmUpdateQuery,
      {
        runValidators: true,
        new: false,
      }
    );
    if (!algorithm) {
      throw new CustomError("No algorithm found by this code");
    }
    const userUpdateQuery = subscribe
      ? {
          $addToSet: {
            subscribedAlgorithms: algorithm._id,
          },
        }
      : {
          $pull: {
            subscribedAlgorithms: algorithm._id,
          },
        };
    const { matchedCount, modifiedCount, upsertedCount } =
      await MarketplaceUserModel.updateOne(
        { email: req.user.email },
        userUpdateQuery,
        {
          upsert: true,
        }
      );
    if (matchedCount + modifiedCount + upsertedCount === 0) {
      throw new CustomError("Failed to toggle subs algorithm");
    }
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.type === "custom_err" ? err.message : "Failed subs algos",
    });
  }
};
const manageUserSubscriptionMirrorTrade = async (req, res) => {
  try {
    const mirrorTradeCode = sanitize(req.body.mirrorTradeCode);
    const subscribe = sanitize(req.body.subscribe) === "true" ? true : false;
    const mirrorTradeUpdateQuery = subscribe
      ? {
          $addToSet: {
            usersSubscribed: req.user.email,
          },
        }
      : {
          $pull: {
            usersSubscribed: req.user.email,
          },
        };

    const mirrorTrade = await MirrorTradesModel.findOneAndUpdate(
      { code: mirrorTradeCode },
      mirrorTradeUpdateQuery,
      {
        runValidators: true,
        new: false,
      }
    );
    if (!mirrorTrade) {
      throw new CustomError("No mirror trade found by this code");
    }
    const userUpdateQuery = subscribe
      ? {
          $addToSet: {
            subscribedMirrorTrades: mirrorTrade._id,
          },
        }
      : {
          $pull: {
            subscribedMirrorTrades: mirrorTrade._id,
          },
        };
    const { matchedCount, modifiedCount, upsertedCount } =
      await MarketplaceUserModel.updateOne(
        { email: req.user.email },
        userUpdateQuery,
        {
          upsert: true,
        }
      );
    if (matchedCount + modifiedCount + upsertedCount === 0) {
      throw new CustomError("Failed to toggle subs mirror trade");
    }
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message:
        err.type === "custom_err" ? err.message : "Failed subs mirror trade",
    });
  }
};
const getAllFavouriteAlgorithms = async (req, res) => {
  try {
    const favouriteAlgorithms = await MarketplaceUserModel.aggregate([
      {
        $match: {
          email: req.user.email,
        },
      },

      {
        $project: {
          favouriteAlgorithms: 1,
          subscribedAlgorithms: 1,
          _id: 0,
        },
      },
      {
        $lookup: {
          from: "algorithms",
          let: {
            subscribedAlgorithms: "$subscribedAlgorithms",
            favouriteAlgorithms: "$favouriteAlgorithms",
          },
          localField: "favouriteAlgorithms",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                isFavourite: {
                  $in: ["$_id", "$$favouriteAlgorithms"],
                },
                isSubscribed: {
                  $in: ["$_id", "$$subscribedAlgorithms"],
                },
                associatedUserEmail: 1,
                associatedUsername: 1,
                code: 1,
                minCapital: 1,
                maxCapital: 1,
                stocks: 1,
                stopLoss: 1,
                backTest: 1,
                price: 1,
                status: 1,
                updatedAt: 1,
                createdAt: 1,
              },
            },
            {
              $lookup: {
                from: "backtests",
                localField: "backTest.id",
                foreignField: "_id",
                as: "backtestData",
                pipeline: [
                  {
                    $project: {
                      _id: 0,
                      report: 1,
                    },
                  },
                ],
              },
            },
            {
              $unwind: "$backtestData",
            },
            {
              $lookup: {
                from: "triggers",
                localField: "stocks.triggers",
                foreignField: "_id",
                pipeline: [
                  {
                    $project: {
                      triggerType: 1,
                    },
                  },
                ],
                as: "triggersData",
              },
            },
          ],
          as: "algorithmsData",
        },
      },
      {
        $project: {
          favouriteAlgorithms: 0,
          subscribedAlgorithms: 0,
          "algorithmsData.backTest": 0,
        },
      },
    ]);
    res.status(200).json({ success: true, favouriteAlgorithms });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message:
        err.type === "custom_err"
          ? err.message
          : "Failed to get favourites algo",
    });
  }
};
const getAllFavouriteMirrorTrades = async (req, res) => {
  try {
    const favouriteMirrorTrades = await MarketplaceUserModel.aggregate([
      {
        $match: {
          email: req.user.email,
        },
      },

      {
        $project: {
          favouriteMirrorTrades: 1,
          subscribedMirrorTrades: 1,
          _id: 0,
        },
      },
      {
        $lookup: {
          from: "mirrortrades",
          let: {
            subscribedMirrorTrades: "$subscribedMirrorTrades",
            favouriteMirrorTrades: "$favouriteMirrorTrades",
          },
          localField: "favouriteMirrorTrades",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                isFavourite: {
                  $in: ["$_id", "$$favouriteMirrorTrades"],
                },
                isSubscribed: {
                  $in: ["$_id", "$$subscribedMirrorTrades"],
                },
                associatedUserEmail: 1,
                associatedUsername: 1,
                code: 1,
                platform: 1,
                keysVerified: 1,
                minCapital: 1,
                maxCapital: 1,
                price: 1,
                updatedAt: 1,
                createdAt: 1,
                report: 1,
              },
            },
          ],
          as: "mirrorTradeData",
        },
      },
      {
        $project: {
          favouriteMirrorTrades: 0,
          subscribedMirrorTrades: 0,
        },
      },
    ]);
    res.status(200).json({ success: true, favouriteMirrorTrades });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message:
        err.type === "custom_err"
          ? err.message
          : "Failed to get favourites mirror trades",
    });
  }
};
const getAllSubscribedAlgorithms = async (req, res) => {
  try {
    const subscribedAlgorithms = await MarketplaceUserModel.aggregate([
      {
        $match: {
          email: req.user.email,
        },
      },

      {
        $project: {
          favouriteAlgorithms: 1,
          subscribedAlgorithms: 1,
          _id: 0,
        },
      },
      {
        $lookup: {
          from: "algorithms",
          let: {
            subscribedAlgorithms: "$subscribedAlgorithms",
            favouriteAlgorithms: "$favouriteAlgorithms",
          },
          localField: "subscribedAlgorithms",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                isFavourite: {
                  $in: ["$_id", "$$favouriteAlgorithms"],
                },
                isSubscribed: {
                  $in: ["$_id", "$$subscribedAlgorithms"],
                },
                associatedUserEmail: 1,
                associatedUsername: 1,
                code: 1,
                minCapital: 1,
                minCapital: 1,
                stocks: 1,
                stopLoss: 1,
                backTest: 1,
                price: 1,
                status: 1,
                updatedAt: 1,
                createdAt: 1,
              },
            },
            {
              $lookup: {
                from: "backtests",
                localField: "backTest.id",
                foreignField: "_id",
                as: "backtestData",
                pipeline: [
                  {
                    $project: {
                      _id: 0,
                      report: 1,
                    },
                  },
                ],
              },
            },
            {
              $unwind: "$backtestData",
            },
            {
              $lookup: {
                from: "triggers",
                localField: "stocks.triggers",
                foreignField: "_id",
                pipeline: [
                  {
                    $project: {
                      triggerType: 1,
                    },
                  },
                ],
                as: "triggersData",
              },
            },
          ],
          as: "algorithmsData",
        },
      },
      {
        $project: {
          subscribedAlgorithms: 0,
          favouriteAlgorithms: 0,
          "algorithmsData.backTest": 0,
        },
      },
    ]);
    res.status(200).json({ success: true, subscribedAlgorithms });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message:
        err.type === "custom_err"
          ? err.message
          : "Failed to get subscribed algos",
    });
  }
};
const getAllSubscribedMirrorTrades = async (req, res) => {
  try {
    const subscribedMirrorTrades = await MarketplaceUserModel.aggregate([
      {
        $match: {
          email: req.user.email,
        },
      },

      {
        $project: {
          favouriteMirrorTrades: 1,
          subscribedMirrorTrades: 1,
          _id: 0,
        },
      },
      {
        $lookup: {
          from: "mirrortrades",
          let: {
            subscribedMirrorTrades: "$subscribedMirrorTrades",
            favouriteMirrorTrades: "$favouriteMirrorTrades",
          },
          localField: "subscribedMirrorTrades",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                isFavourite: {
                  $in: ["$_id", "$$favouriteMirrorTrades"],
                },
                isSubscribed: {
                  $in: ["$_id", "$$subscribedMirrorTrades"],
                },
                associatedUserEmail: 1,
                associatedUsername: 1,
                code: 1,
                platform: 1,
                keysVerified: 1,
                minCapital: 1,
                maxCapital: 1,
                price: 1,
                updatedAt: 1,
                createdAt: 1,
                report: 1,
              },
            },
          ],
          as: "mirrorTradeData",
        },
      },
      {
        $project: {
          favouriteMirrorTrades: 0,
          subscribedMirrorTrades: 0,
        },
      },
    ]);
    res.status(200).json({ success: true, subscribedMirrorTrades });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message:
        err.type === "custom_err"
          ? err.message
          : "Failed to get subscribed mirror trades",
    });
  }
};

const manageBearBullPreferences = async (req, res) => {
  try {
    const algorithmCode = sanitize(req.body.algorithmCode);
    const algorithm = await AlgorithmModel.doesAlgorithmExist(algorithmCode);

    const updateQuery = {};

    //checking above value
    if (req.body.above) {
      const above = req.body.above;
      updateQuery.above = {
        activated: true,
        rating: above,
      };
    } else {
      updateQuery.above = {
        activated: false,
        rating: null,
      };
    }

    //checking below value
    if (req.body.below) {
      const below = req.body.below;
      updateQuery.below = {
        activated: true,
        rating: below,
      };
    } else {
      updateQuery.below = {
        activated: false,
        rating: null,
      };
    }
    const { modifiedCount, upsertedCount } =
      await UserBearBullPreferencesModel.updateOne(
        {
          associatedUserEmail: req.user.email,
          algorithm: algorithm.algorithmObjectId,
        },
        {
          $set: updateQuery,
        },
        {
          runValidators: true,
          upsert: true,
        }
      );
    if (modifiedCount + upsertedCount === 0) {
      throw new CustomError("Failed to update rating", 500);
    }
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json({
      success: false,
      message:
        err.type === "custom_err"
          ? err.message
          : "Failed to get subscribed mirror trades",
    });
  }
};

module.exports = {
  manageUserFavouriteAlgorithm,
  getAllFavouriteAlgorithms,
  manageUserSubscriptionAlgorithm,
  getAllSubscribedAlgorithms,
  manageUserFavouriteMirrorTrades,
  manageUserSubscriptionMirrorTrade,
  getAllFavouriteMirrorTrades,
  getAllSubscribedMirrorTrades,
  manageBearBullPreferences,
};
