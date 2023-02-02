const MutualFundsModel = require("../../api/models/mutualFund");
const { sanitize } = require("../../api/utils/data-handlers");
const { CustomError } = require("../../api/utils/error-handlers");

const updateMutualFunds = async (req, res) => {
  try {
    const mutualFundTicker = sanitize(req.body.mutualFundTicker);
    let updateQuery = { $set: {}, $addToSet: {}, $pullAll: {} };
    //checking for update parameters
    if (req.body.name) {
      const targetField = req.body.name;
      if (targetField.operation === "add") {
        updateQuery.$set = { name: targetField.data, ...updateQuery.$set };
      } else if (targetField.operation === "remove") {
        throw new CustomError("Operation not allowed");
      } else if (targetField.operation === "update") {
        updateQuery.$set = { name: targetField.data, ...updateQuery.$set };
      } else {
        throw new CustomError("Operation not allowed");
      }
    }
    if (req.body.returns) {
      const targetField = req.body.returns;
      if (targetField.operation === "add") {
        updateQuery.$addToSet = {
          returns: targetField.data,
          ...updateQuery.$addToSet,
        };
      } else if (targetField.operation === "remove") {
        updateQuery.$pullAll = {
          returns: targetField.data,
          ...updateQuery.$pullAll,
        };
      } else if (targetField.operation === "update") {
        updateQuery.$set = { returns: targetField.data, ...updateQuery.$set };
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
    if (req.body.sectorWeightings) {
      const targetField = req.body.sectorWeightings;
      if (targetField.operation === "add") {
        updateQuery.$addToSet = {
          sectorWeightings: targetField.data,
          ...updateQuery.$addToSet,
        };
      } else if (targetField.operation === "remove") {
        updateQuery.$pullAll = {
          sectorWeightings: targetField.data,
          ...updateQuery.$pullAll,
        };
      } else if (targetField.operation === "update") {
        updateQuery.$set = {
          sectorWeightings: targetField.data,
          ...updateQuery.$set,
        };
      } else {
        throw new CustomError("Operation not allowed");
      }
    }
    if (req.body.algorithmsMatched) {
      const targetField = req.body.algorithmsMatched;
      if (targetField.operation === "add") {
        updateQuery.$addToSet = {
          algorithmsMatched: targetField.data,
          ...updateQuery.$addToSet,
        };
      } else if (targetField.operation === "remove") {
        updateQuery.$pullAll = {
          algorithmsMatched: targetField.data,
          ...updateQuery.$pullAll,
        };
      } else if (targetField.operation === "update") {
        updateQuery.$set = {
          algorithmsMatched: targetField.data,
          ...updateQuery.$set,
        };
      } else {
        throw new CustomError("Operation not allowed");
      }
    }
    // console.log(updateQuery);
    const { matchedCount, modifiedCount, upsertedCount } =
      await MutualFundsModel.updateOne(
        { ticker: mutualFundTicker },
        updateQuery,
        { runValidators: true, upsert: true }
      );
    // console.log(updateRes);
    if (matchedCount + modifiedCount + upsertedCount === 0) {
      throw new CustomError("Failed to push/update MF");
    }
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message:
        err.type === "custom_err"
          ? err.message
          : "Failed to push mutual funds data",
    });
  }
};

module.exports = { updateMutualFunds };
