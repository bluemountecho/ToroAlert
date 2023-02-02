const StocksModel = require("../../api/models/stocks");
const { sanitize } = require("../../api/utils/data-handlers");
const { CustomError } = require("../../api/utils/error-handlers");

const updateStocks = async (req, res) => {
  try {
    const stockTicker = sanitize(req.body.stockTicker);
    let updateQuery = { $set: {}, $addToSet: {}, $pullAll: {} };
    if (req.body.fullName) {
      const targetField = req.body.fullName;
      if (targetField.operation === "add") {
        updateQuery.$set = { fullName: targetField.data, ...updateQuery.$set };
      } else if (targetField.operation === "remove") {
        throw new CustomError("Operation not allowed");
      } else if (targetField.operation === "update") {
        updateQuery.$set = { fullName: targetField.data, ...updateQuery.$set };
      } else {
        throw new CustomError("Operation not allowed");
      }
    }
    if (req.body.description) {
      const targetField = req.body.description;
      if (targetField.operation === "add") {
        updateQuery.$set = {
          description: targetField.data,
          ...updateQuery.$set,
        };
      } else if (targetField.operation === "remove") {
        throw new CustomError("Operation not allowed");
      } else if (targetField.operation === "update") {
        updateQuery.$set = {
          description: targetField.data,
          ...updateQuery.$set,
        };
      } else {
        throw new CustomError("Operation not allowed");
      }
    }
    if (req.body.sector) {
      const targetField = req.body.sector;
      if (targetField.operation === "add") {
        updateQuery.$set = { sector: targetField.data, ...updateQuery.$set };
      } else if (targetField.operation === "remove") {
        throw new CustomError("Operation not allowed");
      } else if (targetField.operation === "update") {
        updateQuery.$set = { sector: targetField.data, ...updateQuery.$set };
      } else {
        throw new CustomError("Operation not allowed");
      }
    }
    const { matchedCount, modifiedCount, upsertedCount } =
      await StocksModel.updateOne({ ticker: stockTicker }, updateQuery, {
        runValidators: true,
        upsert: true,
      });
    // console.log(updateRes);
    if (matchedCount + modifiedCount + upsertedCount === 0) {
      throw new CustomError("Failed to push/update Stock");
    }
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message:
        err.type === "custom_err" ? err.message : "Failed to push stock data",
    });
  }
};
module.exports = { updateStocks };
