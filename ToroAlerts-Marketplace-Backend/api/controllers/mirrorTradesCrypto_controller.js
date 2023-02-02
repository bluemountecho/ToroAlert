const { sanitize } = require("../utils/data-handlers");
const { CustomError } = require("../utils/error-handlers");
const coinbase = require("coinbase");
const gemini = import("gemini-node-api");
const MirrorTradesClientKeyModel = require("../models/mirrorTradesClientKeys");
const { generateAlgorithmCode } = require("../utils/codeGenerator");
const MirrorTradesModel = require("../models/mirrorTrades");
const supportedPlatforms = ["coinbase", "gemini"];
const allowedMirrorTradesDetailsOperations = [
  "myMirrorTrades",
  "byMirrorTradeCode",
  "topPerformingMirrorTrades",
  "freeMirrorTrades",
];
const validateApiKeysAndGenerateMirrorTrade = async (req, res) => {
  try {
    const platform = sanitize(req.body.platform);
    const clientId = sanitize(req.body.clientId);
    const clientSecret = sanitize(req.body.clientSecret);
    if (!supportedPlatforms.includes(platform)) {
      throw new CustomError("This trading platform is not supported as of now");
    }
    if (platform === "coinbase") {
      let coinbaseClient = new coinbase.Client({
        apiKey: clientId,
        apiSecret: clientSecret,
        strictSSL: false,
      });

      coinbaseClient.getCurrentUser(async (err, user) => {
        try {
          if (err) {
            throw new CustomError("Failed to validate keys at coinbase", 403);
          }
          const { email, name, state, country } = user;
          const clientKeyDoc =
            await MirrorTradesClientKeyModel.findOneAndUpdate(
              {
                platform,
                associatedUserEmail: req.user.email,
                associatedUsername: req.user.name,
              },
              {
                $set: {
                  mirrorTradeEntity: "crypto",
                  clientId: clientId,
                  clientSecret: clientSecret,
                  validated: true,
                  clientInformation: {
                    name,
                    email,
                    demographics: { state, country },
                  },
                },
              },
              {
                runValidators: true,
                upsert: true,
                new: true,
              }
            );
          if (!clientKeyDoc) {
            throw new CustomError(
              "Client credentials are valid, failed to update, try again later!"
            );
          }
          //now lets create a mirror trade as this component needs no bactest so will be directly updated by the data server
          const mirrorTrade = await MirrorTradesModel.findOne({
            platform,
            associatedUserEmail: req.user.email,
            associatedUsername: req.user.name,
          });
          if (!mirrorTrade) {
            const mirrorTradeCode = generateAlgorithmCode(
              10,
              "MT_" + req.user.name
            );
            const MTDoc = new MirrorTradesModel({
              associatedUserEmail: req.user.email,
              associatedUsername: req.user.name,
              platform,
              associatedClientKeys: clientKeyDoc._id,
              code: mirrorTradeCode,
              keysVerified: true, // we will only create MT once keys are verified, in case data server fails to verify and fetch data it can update the keysVerified as false
            });
            await MTDoc.save();
          }
          res.status(202).json({ success: true });
        } catch (err) {
          console.log(err);
          res.status(401).json({
            success: false,
            message:
              err.type === "custom_err" ? err.message : "Failed to validate",
          });
        }
      });
    } else if (platform === "gemini") {
      try {
        const geminiClient = new (await gemini).AuthenticatedClient({
          key: clientId,
          secret: clientSecret,
          sandbox: true,
        });

        const limit_trades = 10;
        const trades = await geminiClient.getPastTrades({
          limit_trades
        });
        
        let tradingHistory = [];
        trades.forEach(function(trade) {
          let history = {
            ticker: trade.symbol,
            buyDate: trade.type === "Buy" ? trade.timestamp : null,
            buyPrice: trade.type === "Buy" ? trade.price : null,
            sellDate: trade.type === "Sell" ? trade.timestamp : null,
            sellPrice: trade.type === "Sell" ? trade.price : null,
            amountInvested: trade.amount,
          }
          tradingHistory.push(history)
        });

        const { email, name } = req.user;
        const clientKeyDoc = await MirrorTradesClientKeyModel.findOneAndUpdate(
          {
            platform,
            associatedUserEmail: req.user.email,
            associatedUsername: req.user.name,
          },
          {
            $set: {
              mirrorTradeEntity: "crypto",
              clientId: clientId,
              clientSecret: clientSecret,
              validated: true,
              clientInformation: {
                name,
                email,
              },
            },
          },
          {
            runValidators: true,
            upsert: true,
            new: true,
          }
        );
        if (!clientKeyDoc) {
          throw new CustomError(
            "Client credentials are valid, failed to update, try again later!"
          );
        }
        //now lets create a mirror trade as this component needs no bactest so will be directly updated by the data server
        const mirrorTrade = await MirrorTradesModel.findOne({
          platform,
          associatedUserEmail: req.user.email,
          associatedUsername: req.user.name,
        });
        if (!mirrorTrade) {
          const mirrorTradeCode = generateAlgorithmCode(
            10,
            "MT_" + req.user.name
          );
          const MTDoc = new MirrorTradesModel({
            associatedUserEmail: req.user.email,
            associatedUsername: req.user.name,
            platform,
            associatedClientKeys: clientKeyDoc._id,
            code: mirrorTradeCode,
            keysVerified: true, // we will only create MT once keys are verified, in case data server fails to verify and fetch data it can update the keysVerified as false
            "report.tradingHistory" : tradingHistory
          });
          await MTDoc.save();
        }
        res.status(202).json({ success: true });
      } catch (err) {
        console.log(err);
        res.status(400).json({ success: false });
      }
    } else {
      //wont go in this
      console.log("ELSE NOT ALLOWED PLATFORM");
      res.status(404).json({ success: false });
    }
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json({
      success: false,
      message: err.type === "custom_err" ? err.message : "Failed to validate",
    });
  }
};

const getMirrorTradeDetails = async (req, res) => {
  try {
    const operationType = sanitize(req.params.operationType);
    if (!allowedMirrorTradesDetailsOperations.includes(operationType)) {
      throw new CustomError("This operation is not allowed");
    }
    responsePayload = {};
    switch (operationType) {
      case "myMirrorTrades":
        const myMirrorTrades = await MirrorTradesModel.aggregate([
          {
            $match: {
              associatedUserEmail: req.user.email,
            },
          },
          {
            $project: {
              _id: 0,
              associatedClientKeys: 0,
              __v: 0,
            },
          },
        ]);
        responsePayload = myMirrorTrades;
        break;
      case "byMirrorTradeCode":
        const mirrorTradeCode = sanitize(req.body.mirrorTradeCode);
        const byMirrorTradeCode = await MirrorTradesModel.aggregate([
          {
            $match: {
              code: mirrorTradeCode,
              public: true,
            },
          },
          {
            $project: {
              _id: 0,
              associatedClientKeys: 0,
              __v: 0,
            },
          },
        ]);
        if (byMirrorTradeCode.length === 0) {
          throw new CustomError("No mirror trade found by this code");
        }
        responsePayload = byMirrorTradeCode[0];
        break;
      case "topPerformingMirrorTrades":
        const topPerformingMirrorTrades = await MirrorTradesModel.aggregate([
          {
            $match: {
              public: true,
            },
          },
          {
            $limit: 10,
          },
          {
            $lookup: {
              from: "marketplaceusers",
              let: {
                mirrorTradeId: "$_id",
                requestedByEmail: req.user.email,
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: ["$$requestedByEmail", "$email"],
                    },
                  },
                },
                {
                  $project: {
                    isFavourite: {
                      $in: ["$$mirrorTradeId", "$favouriteMirrorTrades"],
                    },
                    isSubscribed: {
                      $in: ["$$mirrorTradeId", "$subscribedMirrorTrades"],
                    },
                    _id: 0,
                  },
                },
              ],
              as: "userMirrorTradePrefrences",
            },
          },
          {
            $unwind: {
              path: "$userMirrorTradePrefrences",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $project: {
              _id: 0,
              associatedClientKeys: 0,
              __v: 0,
            },
          },
        ]);
        responsePayload = topPerformingMirrorTrades;
        break;
      case "freeMirrorTrades":
        const freeMirrorTrades = await MirrorTradesModel.aggregate([
          {
            $match: {
              "price.type": "free",
              public: true,
            },
          },
          {
            $limit: 10,
          },
          {
            $lookup: {
              from: "marketplaceusers",
              let: {
                mirrorTradeId: "$_id",
                requestedByEmail: req.user.email,
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: ["$$requestedByEmail", "$email"],
                    },
                  },
                },
                {
                  $project: {
                    isFavourite: {
                      $in: ["$$mirrorTradeId", "$favouriteMirrorTrades"],
                    },
                    isSubscribed: {
                      $in: ["$$mirrorTradeId", "$subscribedMirrorTrades"],
                    },
                    _id: 0,
                  },
                },
              ],
              as: "userMirrorTradePrefrences",
            },
          },
          {
            $unwind: {
              path: "$userMirrorTradePrefrences",
              preserveNullAndEmptyArrays: true,
            },
          },

          {
            $project: {
              _id: 0,
              associatedClientKeys: 0,
              __v: 0,
            },
          },
        ]);
        responsePayload = freeMirrorTrades;
        break;
    }

    res.status(200).json({
      success: true,
      data: responsePayload,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message:
        err.type === "custom_err" ? err.message : "Failed to get details",
    });
  }
};

const updateMirrorTrade = async (req, res) => {
  try {
    const mirrorTradeCode = sanitize(req.body.mirrorTradeCode);
    const mirrorTrade = await MirrorTradesModel.findOne({
      code: mirrorTradeCode,
    });
    if (!mirrorTrade) {
      throw new CustomError("No Mirror Trade found by this code");
    }
    //checking if mirror trade is locked or not
    if (mirrorTrade.locked) {
      throw new CustomError("Mirror Trade is locked and cannot be edited");
    }

    let updateQuery = { $set: {}, $addToSet: {}, pullAll: {} };
    if (req.body.price) {
      const targetField = req.body.price;
      if (targetField.operation === "add") {
        updateQuery.$set = {
          price: targetField.data,
          ...updateQuery.$set,
        };
      } else if (targetField.operation === "update") {
        updateQuery.$set = {
          price: targetField.data,
          ...updateQuery.$set,
        };
      } else if (targetField.operation === "remove") {
        throw new CustomError("Operation not allowed");
      } else {
        throw new CustomError("Operation not allowed");
      }
    }
    if (req.body.minCapital) {
      const targetField = req.body.minCapital;
      if (targetField.operation === "add") {
        updateQuery.$set = {
          minCapital: targetField.data,
          ...updateQuery.$set,
        };
      } else if (targetField.operation === "update") {
        updateQuery.$set = {
          minCapital: targetField.data,
          ...updateQuery.$set,
        };
      } else if (targetField.operation === "remove") {
        throw new CustomError("Operation not allowed");
      } else {
        throw new CustomError("Operation not allowed");
      }
    }
    if (req.body.maxCapital) {
      const targetField = req.body.maxCapital;
      if (targetField.operation === "add") {
        updateQuery.$set = {
          maxCapital: targetField.data,
          ...updateQuery.$set,
        };
      } else if (targetField.operation === "update") {
        updateQuery.$set = {
          maxCapital: targetField.data,
          ...updateQuery.$set,
        };
      } else if (targetField.operation === "remove") {
        throw new CustomError("Operation not allowed");
      } else {
        throw new CustomError("Operation not allowed");
      }
    }
    // console.log(updateQuery);
    const { matchedCount, modifiedCount } = await MirrorTradesModel.updateOne(
      { code: mirrorTradeCode },
      updateQuery,
      { runValidators: true }
    );
    if (matchedCount + modifiedCount === 0) {
      throw new CustomError("Failed to update the mirror trade");
    }
    res.status(202).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message:
        err.type === "custom_err"
          ? err.message
          : "Failed to update mirror trade, make sure your body is correct",
    });
  }
};

const submitForLease = async (req, res) => {
  try {
    const mirrorTradeCode = sanitize(req.body.mirrorTradeCode);
    const mirrorTrade = await MirrorTradesModel.findOneAndUpdate(
      {
        code: mirrorTradeCode,
      },
      {
        $set: {
          locked: false,//true
          public: true,
        },
      },
      {
        runValidators: true,
        new: true,
      }
    );
    if (!mirrorTrade) {
      throw new CustomError(
        "No Mirror Trade found by this code, failed to update"
      );
    }
    res.status(202).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message:
        err.type === "custom_err" ? err.message : "Failed to submit for lease",
    });
  }
};

const matchMirrorTrades = async (req, res) => {
  try {
    const returnType = sanitize(req.body.returnType);
    const low = parseInt(sanitize(req.body.low));
    const high = parseInt(sanitize(req.body.high));

    const returnTypesAllowed = [
      "days_30",
      "days_90",
      "year_1",
      "year_3",
      "year_5",
    ];

    if (!returnTypesAllowed.includes(returnType)) {
      throw new CustomError("Return type not allowed");
    }
    const matchedMirrorTrades = await MirrorTradesModel.aggregate([
      {
        $match: {
          public: true,
        },
      },
      {
        $match: {
          $expr: {
            $and: [
              { $gte: [`$report.returns.${returnType}`, low] },
              { $lte: [`$report.returns.${returnType}`, high] },
            ],
          },
        },
      },
    ]);
    res.status(200).json({
      success: true,
      matchedMirrorTrades,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message:
        err.type === "custom_err"
          ? err.message
          : "Failed to match mirror trade, make sure payload is correct",
    });
  }
};

module.exports = {
  validateApiKeysAndGenerateMirrorTrade,
  getMirrorTradeDetails,
  updateMirrorTrade,
  submitForLease,
  matchMirrorTrades,
};
