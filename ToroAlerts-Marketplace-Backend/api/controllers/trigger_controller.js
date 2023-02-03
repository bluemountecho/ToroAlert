const { sanitize } = require("../utils/data-handlers");
const { CustomError } = require("../utils/error-handlers");
const TriggerModel = require("../models/triggers");
const { triggerSchemaValidator } = require("../validators/triggerValidators");
const AlgorithmModel = require("../models/algorithm");

const addTrigger = async (req, res) => {
  try {
    const algorithmCode = sanitize(req.body.algorithmCode);
    const stockTickers = req.body.stockTickers;
    const triggerType = sanitize(req.body.triggerType);
    const triggerData = {};
    const algorithm = await AlgorithmModel.stocksInAlgorithm(algorithmCode); //checking for algorithm code, stock ticker
    let extraUpdateQuery = {};

    //checks for updation
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
    const intersection = algorithm.stocksInAlgorithm.filter((ticker) =>
      stockTickers.includes(ticker)
    );
    if (intersection.length !== stockTickers.length) {
      throw new CustomError("Atleast a stock ticker missing, add them");
    }
    Object.entries(req.body.triggerData).map(([key, value]) => {
      triggerData[key] = { applied: true, ...value };
    }); // will ease in checking which trigger instruction is applied

    const triggerObject = new TriggerModel({ triggerType, ...triggerData });
    await triggerSchemaValidator(triggerObject); //checks if schema is valid, with error module
    const trigger = await triggerObject.save();
    const triggerId = trigger._id;
    const { matchedCount, modifiedCount } = await AlgorithmModel.updateOne(
      { code: algorithmCode },
      {
        $addToSet: {
          "stocks.$[tickerFilter].triggers": triggerId,
        },
        ...extraUpdateQuery,
      },
      {
        arrayFilters: [{ "tickerFilter.tickerId": { $in: stockTickers } }],
      }
    );
    if (matchedCount !== 1 || modifiedCount !== 1) {
      throw new CustomError("Failed to add trigger");
    }
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message:
        err.type === "custom_err"
          ? err.message
          : "Failed to create trigger make sure, you are posting a valid trigger data",
    });
  }
};
const removeTrigger = async (req, res) => {
  try {
    const algorithmCode = sanitize(req.body.algorithmCode);
    // const tickerId = sanitize(req.body.tickerId);
    const tickerIds = req.body.tickerIds;
    const triggerId = sanitize(req.body.triggerId);
    const algorithm = await AlgorithmModel.stocksInAlgorithm(algorithmCode); //checking for algorithm code, stock ticker
    let extraUpdateQuery = {};

    //checks for updation
    if (algorithm.locked) {
      throw new CustomError("Algorithm is locked and can't be updated");
    }

    //commenting this to provide array of tickers
    // check for stock and trigger
    // const isStockTicker = algorithm.stocks.find(
    //   (stock) => stock.tickerId === tickerId
    // );
    // if (!isStockTicker) {
    //   throw new CustomError("failed to get any ticker provided");
    // }
    // const isTrigger = isStockTicker.triggers.find(
    //   (_id) => _id.toString() === triggerId
    // );
    // if (!isTrigger) {
    //   throw new CustomError("failed to get any trigger provided");
    // }

    if (algorithm.version === algorithm.lastBacktestVersion) {
      extraUpdateQuery = {
        $inc: { version: 1 },
        $set: {
          "backTest.submitted": false,
          "backTest.approved": false,
        },
      };
    }

    const { matchedCount, modifiedCount } = await AlgorithmModel.updateOne(
      { code: algorithmCode, "stocks.tickerId": { $in: tickerIds } },
      {
        $pull: {
          "stocks.$[].triggers": triggerId,
        },
        ...extraUpdateQuery,
      }
    );
    
    if (matchedCount !== 1 || modifiedCount !== 1) {
      throw new CustomError("Failed to remove trigger from Algorithm");
    }

    const isDeleted = await TriggerModel.deleteOne({_id: triggerId});

    if (!isDeleted) {
      throw new CustomError(
        "Failed to delete trigger make sure it exists/allowed to delete"
      );
    }
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message:
        err.type === "custom_err"
          ? err.message
          : "Failed to remove trigger make sure, you are posting a valid trigger data",
    });
  }
};

module.exports = { addTrigger, removeTrigger };
