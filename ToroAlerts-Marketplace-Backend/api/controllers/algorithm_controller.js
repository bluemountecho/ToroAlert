const AlgorithmModel = require("../models/algorithm");
const StocksModel = require("../models/stocks");
const BacktestModel = require("../models/backtest");
const { sanitize } = require("../utils/data-handlers");
const { CustomError } = require("../utils/error-handlers");
const { generateAlgorithmCode } = require("../utils/codeGenerator");
const LeaseModel = require("../models/lease");
const allowedStocksOperations = [
  "update",
  // "add",
  // "remove",
  // "manageAssetAllocationPercentage",
];
const allowedAlgorithmUpdateOperations = ["capital", "stoploss", "price"];
const allowedAlgorithmDetailsOperations = [
  "myAlgorithms",
  "byAlgorithmCode",
  "topPerforming",
  "free",
];

const getAlgorithmDetails = async (req, res) => {
  try {
    const operationType = sanitize(req.params.operationType);
    if (!allowedAlgorithmDetailsOperations.includes(operationType)) {
      throw new CustomError("Operation not allowed");
    }
    let responsePayload = {};
    switch (operationType) {
      case "myAlgorithms":
        const myAlgorithms = await AlgorithmModel.aggregate([
          {
            $match: {
              associatedUserEmail: req.user.email,
            },
          },
          // {
          //   $project: {
          //     backtestedDataAlgorithms: { $ne: ["$backTest.id", null] },
          //   },
          // },
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
            $lookup: {
              from: "triggers",
              localField: "stocks.triggers",
              foreignField: "_id",
              as: "triggersData",
            },
          },
          // {
          //   $unwind: "$backtestData",
          // },
          {
            $project: {
              _id: 0,
              __v: 0,
              // createdAt: 0,
              // updatedAt: 0,
              lastBacktestVersion: 0,
              locked: 0,
              version: 0,
            },
          },
        ]);
        responsePayload = myAlgorithms;
        break;

      case "byAlgorithmCode":
        const byAlgorithmCode = sanitize(req.body.algorithmCode);
        const algorithmByAlgorithmCode = await AlgorithmModel.aggregate([
          {
            $match: {
              code: byAlgorithmCode,
              "backTest.submitted": true,
            },
          },
          {
            $lookup: {
              from: "marketplaceusers",
              let: {
                algoId: "$_id",
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
                    isSubscribed: {
                      $in: ["$$algoId", "$subscribedAlgorithms"],
                    },
                    isFavourite: {
                      $in: ["$$algoId", "$favouriteAlgorithms"],
                    },
                    _id: 0,
                  },
                },
              ],
              as: "userAlgorithmPrefrences",
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
            $lookup: {
              from: "triggers",
              localField: "stocks.triggers",
              foreignField: "_id",
              as: "triggersData",
            },
          },
          {
            $lookup: {
              from: "mutualfunds",
              let: {
                algoId: "$_id",
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $in: ["$$algoId", "$algorithmsMatched"],
                    },
                  },
                },
                {
                  $project: {
                    _id: 0,
                    ticker: 1,
                  },
                },
              ],
              as: "associatedMutualFunds",
            },
          },
          {
            $unwind: "$backtestData",
          },
          {
            $unwind: {
              path: "$userAlgorithmPrefrences",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $project: {
              _id: 0,
              __v: 0,
              // createdAt: 0,
              // updatedAt: 0,
              lastBacktestVersion: 0,
              locked: 0,
              version: 0,
            },
          },
        ]);
        if (algorithmByAlgorithmCode.length === 0) {
          throw new CustomError("No details found against this query");
        }
        responsePayload = algorithmByAlgorithmCode[0];
        break;

      case "topPerforming":
        console.log(req.user.email);
        const algorithmTopPerforming = await AlgorithmModel.aggregate([
          {
            $match: {
              "backTest.submitted": true,
            },
          },
          {
            $limit: 10,
          },
          {
            $lookup: {
              from: "marketplaceusers",
              let: {
                algoId: "$_id",
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
                    isSubscribed: {
                      $in: ["$$algoId", "$subscribedAlgorithms"],
                    },
                    isFavourite: {
                      $in: ["$$algoId", "$favouriteAlgorithms"],
                    },
                    _id: 0,
                  },
                },
              ],
              as: "userAlgorithmPrefrences",
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
            $lookup: {
              from: "triggers",
              localField: "stocks.triggers",
              foreignField: "_id",
              as: "triggersData",
            },
          },
          {
            $unwind: "$backtestData",
          },
          {
            $unwind: {
              path: "$userAlgorithmPrefrences",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $project: {
              _id: 0,
              __v: 0,
              // createdAt: 0,
              // updatedAt: 0,
              lastBacktestVersion: 0,
              locked: 0,
              version: 0,
            },
          },
        ]);
        // if (algorithmTopPerforming.length === 0) {
        //   throw new CustomError("No details found against this query");
        // }
        responsePayload = algorithmTopPerforming;
        break;

      case "free":
        const algorithmFree = await AlgorithmModel.aggregate([
          {
            $match: {
              "backTest.submitted": true,
              "price.type": "free",
            },
          },
          {
            $limit: 10,
          },
          {
            $lookup: {
              from: "marketplaceusers",
              let: {
                algoId: "$_id",
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
                    isSubscribed: {
                      $in: ["$$algoId", "$subscribedAlgorithms"],
                    },
                    isFavourite: {
                      $in: ["$$algoId", "$favouriteAlgorithms"],
                    },
                    _id: 0,
                  },
                },
              ],
              as: "userAlgorithmPrefrences",
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
            $lookup: {
              from: "triggers",
              localField: "stocks.triggers",
              foreignField: "_id",
              as: "triggersData",
            },
          },
          {
            $unwind: "$backtestData",
          },
          {
            $unwind: {
              path: "$userAlgorithmPrefrences",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $project: {
              _id: 0,
              __v: 0,
              // createdAt: 0,
              // updatedAt: 0,
              lastBacktestVersion: 0,
              locked: 0,
              version: 0,
            },
          },
        ]);
        // if (algorithmFree.length === 0) {
        //   throw new CustomError("No details found against this query");
        // }
        responsePayload = algorithmFree;
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

const createAlgorithm = async (req, res) => {
  try {
    const code = await generateAlgorithmCode(10, req.user.name);
    const associatedUserEmail = req.user.email;
    const associatedUsername = req.user.name;
    const algorithmCodeExists = await AlgorithmModel.findOneAndUpdate(
      { code },
      { $setOnInsert: { code, associatedUserEmail, associatedUsername } },
      { upsert: true, new: false }
    );
    if (algorithmCodeExists) {
      throw new CustomError(
        "Oops! Code Already exists please refresh and try again once"
      );
    }
    res
      .status(200)
      .json({ success: true, message: "Algoritm created successfully", code });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message:
        err.type === "custom_err"
          ? err.message
          : "Failed to create an algorithm, please try again. If problem persists contact admin",
    });
  }
};

const backtestAlgorithm = async (req, res) => {
  try {
    const code = sanitize(req.body.code);
    const algorithm = await AlgorithmModel.findOne(
      { code },
      {
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
        price: 0,
        leaseStatus: 0,
        backTest: 0,
      }
    )
      .populate({
        path: "stocks.triggers",
        select: {
          _id: 0,
          __v: 0,
          createdAt: 0,
          updatedAt: 0,
        },
      })
      .lean();
    if (!algorithm) {
      throw new CustomError("No algorithm found by this code");
    }

    //checking if algo is locked
    if (algorithm.locked) {
      throw new CustomError(
        "Algorithm is locked and cant be updated/backtested now"
      );
    }
    const backtest = await BacktestModel.create({
      algorithm: algorithm._id,
      algorithmVersion: algorithm.version,
      algorithmData: algorithm,
    });
    const { matchedCount, modifiedCount } = await AlgorithmModel.updateOne(
      { code, version: algorithm.version },
      {
        $set: {
          backTest: { submitted: true, approved: false, id: backtest._id },
          lastBacktestVersion: algorithm.version,
          status: "pending",
        },
      },
      {
        runValidators: true,
      }
    );
    if (matchedCount !== 1 || modifiedCount !== 1) {
      throw new CustomError(
        "Backtest Created, failed to update algoritm flags"
      );
    }
    res.status(200).json({
      success: true,
      message: "Algorithm submitted for backtesting",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message:
        err.type === "custom_err"
          ? err.message
          : "Failed to submit algorithm for back test, please try again. If problem persists contact admin",
    });
  }
};

const submitForLease = async (req, res) => {
  try {
    const algorithmCode = sanitize(req.body.algorithmCode);
    const algorithm = await AlgorithmModel.findOne({ code: algorithmCode });
    if (!algorithm) {
      throw new CustomError("No algorithm found by this code");
    }

    //checking if algo is locked
    if (algorithm.locked) {
      throw new CustomError(
        "Algorithm is locked and cant be updated/leased now"
      );
    }

    if (!algorithm.backTest.approved || !algorithm.backTest.submitted) {
      throw new CustomError(
        "Please backtest algorithm and get it approved before you submit for lease"
      );
    }

    const leaseObject = await LeaseModel.create({
      algorithm: algorithm._id,
      algorithmVersion: algorithm.version,
      price: algorithm.price,
      backtest: algorithm.backTest.id,
    });

    const { matchedCount, modifiedCount } = await AlgorithmModel.updateOne(
      { code: algorithmCode, version: algorithm.version },
      {
        $set: {
          leaseStatus: {
            submitted: true,
            approved: false,
            id: leaseObject._id,
          },
          locked: true,
        },
      },
      {
        runValidators: true,
      }
    );

    if (matchedCount !== 1 || modifiedCount !== 1) {
      throw new CustomError(
        "Lease Object Created, failed to update algoritm flags"
      );
    }
    res.status(200).json({ success: true, message: "Submitted for lease" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message:
        err.type === "custom_err"
          ? err.message
          : "Failed to submit algorithm for back test, please try again. If problem persists contact admin",
    });
  }
};

const updateAlgorithm = async (req, res) => {
  try {
    const operationType = sanitize(req.params.operationType);
    if (!allowedAlgorithmUpdateOperations.includes(operationType)) {
      throw new CustomError(
        "This operation on update algorithm in not allowed"
      );
    }
    const algorithmCode = sanitize(req.body.algorithmCode);
    const findQuery = { code: algorithmCode, locked: false };
    let updateQuery;
    let extraUpdateQuery = {
      $set: {},
    };
    //versioning algorithm to falicitate versioning in backtesing
    const algorithm = await AlgorithmModel.findOne(findQuery);
    if (!algorithm) {
      throw new CustomError("Please make sure algo code exists");
    }
    if (algorithm.locked) {
      throw new CustomError("Algorithm is locked and can't be updated");
    }
    if (algorithm.version === algorithm.lastBacktestVersion) {
      extraUpdateQuery = {
        $inc: { version: 1 },
        $set: {
          "backTest.submitted": false,
          "backTest.approved": false,
        },
      };
    }
    switch (operationType) {
      case "capital":
        const minCapital = parseFloat(sanitize(req.body.minCapital));
        const maxCapital = parseFloat(sanitize(req.body.maxCapital));
        updateQuery = {
          $set: {
            minCapital: minCapital,
            maxCapital: maxCapital,
            ...extraUpdateQuery.$set,
          },
        };
        break;
      case "price":
        const priceType = sanitize(req.body.type);
        const priceAmount = parseFloat(sanitize(req.body.amount));
        updateQuery = {
          $set: {
            price: { type: priceType, amount: priceAmount },
            ...extraUpdateQuery.$set,
          },
        };
        break;
      case "stoploss":
        const isStoplossActive =
          sanitize(req.body.active) === "true" ? true : false;
        const stoplossType = sanitize(req.body.type);
        const stoplossPercentValue = parseFloat(
          sanitize(req.body.percentValue)
        );
        updateQuery = {
          $set: {
            stopLoss: {
              active: isStoplossActive,
              type: stoplossType,
              percentValue: stoplossPercentValue,
            },
            ...extraUpdateQuery.$set,
          },
        };
        break;
    }
    updateQuery = { ...extraUpdateQuery, ...updateQuery };
    // console.log(updateQuery);
    const { matchedCount, modifiedCount } = await AlgorithmModel.updateOne(
      findQuery,
      updateQuery,
      { runValidators: true }
    );
    if (matchedCount !== 1) {
      throw new CustomError("Please make sure code exists");
    }
    if (modifiedCount !== 1) {
      throw new CustomError("Failed to update algorithm");
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message:
        err.type === "custom_err" ? err.message : "Failed to update algoithm",
    });
  }
};

const algorithmStocksManager = async (req, res) => {
  try {
    const operationType = sanitize(req.params.operationType);
    if (!allowedStocksOperations.includes(operationType)) {
      throw new CustomError("This operation on stocks in not allowed");
    }
    const algorithmCode = sanitize(req.body.algorithmCode);
    var algorithm;

    switch (operationType) {
      case "update":
        const tickers = req.body.tickers;
        let totalAssetAllocationPercentageRequested = 0;
        const assetAllocationPercentages =
          req.body.assetAllocationPercentages.map((val) => {
            const numVal = parseInt(val);
            totalAssetAllocationPercentageRequested += numVal;
            return numVal;
          });

        if (
          tickers.length !== assetAllocationPercentages.length ||
          totalAssetAllocationPercentageRequested > 100
        ) {
          throw new CustomError(
            "Improper request,makes sure field and conditions are satisfied"
          );
        }

        const allPromiseResolution = await Promise.all([
          AlgorithmModel.stocksInAlgorithm(algorithmCode),
          StocksModel.doStocksExist(tickers),
        ]);
        algorithm = allPromiseResolution[0];

        //check for algorithm updation
        let extraUpdateQuery = {
          $set: {},
        };
        if (algorithm.locked) {
          throw new CustomError("Algorithm is locked and can't be updated");
        }
        if (algorithm.version === algorithm.lastBacktestVersion) {
          extraUpdateQuery = {
            $inc: { version: 1 },
            $set: {
              "backTest.submitted": false,
              "backTest.approved": false,
            },
          };
        }

        const stocks = tickers.map((ticker, i) => {
          const stock = {
            tickerId: ticker,
            assetAllocationPercentage: assetAllocationPercentages[i],
          };
          const triggers = algorithm.stocks.find(
            (presentStock) => ticker === presentStock.tickerId
          );
          return { ...stock, triggers: triggers ? triggers.triggers : [] };
        });
        let updateQuery = {
          $set: {
            stocks,
            ...extraUpdateQuery.$set,
          },
        };
        updateQuery = { ...extraUpdateQuery, ...updateQuery };
        const { matchedCount, modifiedCount } = await AlgorithmModel.updateOne(
          { code: algorithmCode },
          updateQuery,
          {
            runValidators: true,
          }
        );
        if (matchedCount !== 1 || modifiedCount !== 1) {
          throw new CustomError("Failed to update Algorithm, please retry");
        }
        break;

      // case "add":
      //   const tickers = req.body.tickers;
      //   let totalAssetAllocationPercentageRequested = 0;
      //   const assetAllocationPercentages =
      //     req.body.assetAllocationPercentages.map((val) => {
      //       const numVal = parseInt(val);
      //       totalAssetAllocationPercentageRequested += numVal;
      //       return numVal;
      //     });
      //   if (tickers.length !== assetAllocationPercentages.length) {
      //     throw new CustomError("Improper req body");
      //   }
      //   const allPromiseResolution = await Promise.all([
      //     AlgorithmModel.stocksInAlgorithm(algorithmCode),
      //     StocksModel.doStocksExist(tickers),
      //   ]);
      //   algorithm = allPromiseResolution[0];
      //   //check for algorithm updation
      //   let extraUpdateQuery = {};
      //   if (algorithm.locked) {
      //     throw new CustomError("Algorithm is locked and can't be updated");
      //   }
      //   if (algorithm.version === algorithm.lastBacktestVersion) {
      //     extraUpdateQuery = {
      //       $inc: { version: 1 },
      //       $set: {
      //         "backTest.submitted": false,
      //         "backTest.approved": false,
      //       },
      //     };
      //   }

      //   // checking if stocks already exists
      //   const intersection = algorithm.stocksInAlgorithm.filter((ticker) =>
      //     tickers.includes(ticker)
      //   );
      //   if (intersection.length !== 0) {
      //     throw new CustomError(
      //       "Atleast a stocks in payload already present, try updating if required"
      //     );
      //   }
      //   if (
      //     totalAssetAllocationPercentageRequested +
      //       algorithm.totalAllocationPercentage >
      //     100
      //   ) {
      //     throw new CustomError("Stock allocation percent exceeded 100%");
      //   }
      //   const stocks = tickers.map((ticker, i) => ({
      //     tickerId: ticker,
      //     assetAllocationPercentage: assetAllocationPercentages[i],
      //   }));
      //   const { matchedCount, modifiedCount } = await AlgorithmModel.updateOne(
      //     { code: algorithmCode },
      //     {
      //       $addToSet: { stocks: stocks },
      //       ...extraUpdateQuery,
      //     }
      //   );
      //   if (matchedCount !== 1 || modifiedCount !== 1) {
      //     throw new CustomError("Failed to update algorithm");
      //   }
      //   break;
      // case "remove":
      //   const tickerId = sanitize(req.body.tickerId);
      //   algorithm = await AlgorithmModel.stocksInAlgorithm(algorithmCode);
      //   //check for algorithm updation
      //   let extraUpdateQueryRm = {};
      //   if (algorithm.locked) {
      //     throw new CustomError("Algorithm is locked and can't be updated");
      //   }
      //   if (!algorithm.stocksInAlgorithm.includes(tickerId)) {
      //     throw new CustomError("ticker not present in this algorithm");
      //   }

      //   if (algorithm.version === algorithm.lastBacktestVersion) {
      //     extraUpdateQueryRm = {
      //       $inc: { version: 1 },
      //       $set: {
      //         "backTest.submitted": false,
      //         "backTest.approved": false,
      //       },
      //     };
      //   }
      //   const removeUpdateRes = await AlgorithmModel.updateOne(
      //     { code: algorithmCode, "stocks.tickerId": tickerId },
      //     {
      //       $pull: {
      //         stocks: { tickerId },
      //       },
      //       ...extraUpdateQueryRm,
      //     },
      //     { new: true }
      //   );
      //   if (
      //     removeUpdateRes.matchedCount !== 1 ||
      //     removeUpdateRes.modifiedCount !== 1
      //   ) {
      //     throw new CustomError("Failed to update algorithm");
      //   }
      //   break;
      // case "manageAssetAllocationPercentage":
      //   const tickersPresent = req.body.tickers;
      //   let newTotalAssetAllocationPercentageRequested = 0;
      //   const newAssetAllocationPercentages =
      //     req.body.assetAllocationPercentages.map((val) => {
      //       const numVal = parseInt(val);
      //       newTotalAssetAllocationPercentageRequested += numVal;
      //       return numVal;
      //     });
      //   if (tickersPresent.length !== newAssetAllocationPercentages.length) {
      //     throw new CustomError("Improper req body");
      //   }
      //   algorithm = await AlgorithmModel.stocksInAlgorithm(algorithmCode);
      //   //check for algorithm updation
      //   let extraUpdateQueryMngAA = {};
      //   if (algorithm.locked) {
      //     throw new CustomError("Algorithm is locked and can't be updated");
      //   }
      //   if (algorithm.version === algorithm.lastBacktestVersion) {
      //     extraUpdateQueryMngAA = {
      //       $inc: { version: 1 },
      //       $set: {
      //         "backTest.submitted": false,
      //         "backTest.approved": false,
      //       },
      //     };
      //   }
      //   // checking if stocks exists
      //   if (
      //     JSON.stringify(algorithm.stocksInAlgorithm.sort()) !==
      //     JSON.stringify(tickersPresent.sort())
      //   ) {
      //     throw new CustomError("Atleast a stocks in payload missing/extra");
      //   }
      //   //checking for the percent allocated
      //   if (newTotalAssetAllocationPercentageRequested > 100) {
      //     throw new CustomError("Stock allocation percent exceeded 100%");
      //   }
      //   await AlgorithmModel.aggregate([
      //     {
      //       $match: {
      //         code: algorithmCode,
      //       },
      //     },
      //     {
      //       $project: {
      //         newAssetAllocationPercentages: newAssetAllocationPercentages,
      //         stocks: 1,
      //       },
      //     },
      //     {
      //       $set: {
      //         stocks: {
      //           $map: {
      //             input: { $range: [0, { $size: "$stocks" }] },
      //             as: "index",
      //             in: {
      //               $mergeObjects: [
      //                 { $arrayElemAt: ["$stocks", "$$index"] },
      //                 {
      //                   assetAllocationPercentage: {
      //                     $arrayElemAt: [
      //                       "$newAssetAllocationPercentages",
      //                       "$$index",
      //                     ],
      //                   },
      //                 },
      //               ],
      //             },
      //           },
      //         },
      //       },
      //     },
      //     // {
      //     //   $set: {
      //     //     stocks: "$newStocks",
      //     //   },
      //     // },
      //   ]);
      //   break;
    }
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message:
        err.type === "custom_err"
          ? err.message
          : "Failed to submit algorithm for back test, please try again. If problem persists contact admin",
    });
  }
};

const matchAlgorithm = async (req, res) => {
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

    const matchedData = await AlgorithmModel.aggregate([
      {
        $match: {
          "backTest.submitted": true, // we have to add lease /locked logic once done
        },
      },
      {
        $lookup: {
          from: "backtests",
          localField: "backTest.id",
          foreignField: "_id",
          // pipeline: [
          //   {
          //     $match: {
          //       $expr: {
          //         $and: [
          //           { $gte: [`$report.returns.${returnType}`, low] },
          //           { $lte: [`$report.returns.${returnType}`, high] },
          //         ],
          //       },
          //     },
          //   },
          //   { $project: { "report.returns": 1 } },
          // ],
          as: "backtestData",
        },
      },
      {
        $lookup: {
          from: "stocks",
          localField: "stocks.tickerId",
          foreignField: "ticker",
          pipeline: [
            {
              $project: {
                // ticker: 1,
                sector: 1,
                // fullName: 1,
                _id: 0,
              },
            },
          ],
          as: "stocksData",
        },
      },
      {
        $unwind: "$backtestData",
      },
      {
        $match: {
          $expr: {
            $and: [
              { $gte: [`$backtestData.report.returns.${returnType}`, low] },
              { $lte: [`$backtestData.report.returns.${returnType}`, high] },
            ],
          },
        },
      },
      {
        $project: {
          _id: 0,
          "backtestData.report.returns": 1,
          code: 1,
          // stocksData: 1,
          stockSectorsInAlgorithm: "$stocksData.sector",
        },
      },
    ]);
    res.status(200).json({
      success: true,
      data: matchedData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message:
        err.type === "custom_err"
          ? err.message
          : "Failed to match an algorithm with given details",
    });
  }
};

const deleteAlgorithm = async (req, res) => {
  try {
    const algorithmCode = sanitize(req.body.algorithmCode);
    const allowedDeletionStatus = ["notSubmitted"];
    const isDeleted = await AlgorithmModel.findOneAndDelete({
      code: algorithmCode,
      status: { $in: allowedDeletionStatus },
    });
    if (!isDeleted) {
      throw new CustomError(
        "Failed to delete algo make sure it exists/allowed to delete"
      );
    }
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message:
        err.type === "custom_err" ? err.message : "Failed to delete algorithm",
    });
  }
};

module.exports = {
  getAlgorithmDetails,
  createAlgorithm,
  backtestAlgorithm,
  algorithmStocksManager,
  updateAlgorithm,
  matchAlgorithm,
  submitForLease,
  deleteAlgorithm,
};
