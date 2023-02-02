const MirrorTradesModel = require("../../api/models/mirrorTrades");
const { sanitize } = require("../../api/utils/data-handlers");
const { CustomError } = require("../../api/utils/error-handlers");

const pullMirrorTrades = async (req, res) => {
  try {
    const mirrorTrades = await MirrorTradesModel.aggregate([
      {
        $lookup: {
          from: "mirrortradesclientkeys",
          localField: "associatedClientKeys",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                _id: 0,
                clientId: 1,
                clientSecret: 1,
              },
            },
          ],
          as: "clientAPIData",
        },
      },
      {
        $unwind: "$clientAPIData",
      },
      {
        $addFields: {
          mirrorTradeObjectId: "$_id",
        },
      },
      {
        $project: {
          _id: 0,
          associatedClientKeys: 0,
        },
      },
    ]);
    res.status(200).json({
      success: true,
      data: mirrorTrades,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message:
        err.type === "custom_err"
          ? err.message
          : "Failed to pull mirror trades",
    });
  }
};

const pushMirrorTradeData = async (req, res) => {
  try {
    const mirrorTradeObjectId = sanitize(req.body.mirrorTradeObjectId);
    let updateQuery = { $set: {}, $addToSet: {}, $pullAll: {} };
    if (req.body.returns) {
      const targetField = req.body.returns;
      if (targetField.operation === "add") {
        updateQuery.$set = {
          "report.returns": targetField.data,
          ...updateQuery.$set,
        };
      } else if (targetField.operation === "update") {
        updateQuery.$set = {
          "report.returns": targetField.data,
          ...updateQuery.$set,
        };
      } else if (targetField.operation === "remove") {
        throw new CustomError("Operation not allowed");
      } else {
        throw new CustomError("Operation not allowed");
      }
    }
    if (req.body.summary) {
      const targetField = req.body.summary;
      if (targetField.operation === "add") {
        updateQuery.$addToSet = {
          "report.summary": targetField.data,
          ...updateQuery.$addToSet,
        };
      } else if (targetField.operation === "update") {
        updateQuery.$set = {
          "report.summary": targetField.data,
          ...updateQuery.$set,
        };
      } else if (targetField.operation === "remove") {
        updateQuery.$pullAll = {
          "report.summary": targetField.data,
          ...updateQuery.$pullAll,
        };
      } else {
        throw new CustomError("Operation not allowed");
      }
    }
    if (req.body.tradingHistory) {
      const targetField = req.body.tradingHistory;
      if (targetField.operation === "add") {
        updateQuery.$addToSet = {
          "report.tradingHistory": targetField.data,
          ...updateQuery.$addToSet,
        };
      } else if (targetField.operation === "update") {
        updateQuery.$set = {
          "report.tradingHistory": targetField.data,
          ...updateQuery.$set,
        };
      } else if (targetField.operation === "remove") {
        updateQuery.$pullAll = {
          "report.tradingHistory": targetField.data,
          ...updateQuery.$pullAll,
        };
      } else {
        throw new CustomError("Operation not allowed");
      }
    }
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
    const mirrorTrade = await MirrorTradesModel.findByIdAndUpdate(
      mirrorTradeObjectId,
      updateQuery,
      { runValidators: true, new: true }
    );
    if (!mirrorTrade) {
      throw new CustomError("No mirror trade by this object id");
    }
    res.status(200).json({ success: true, mirrorTrade });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message:
        err.type === "custom_err"
          ? err.message
          : "Failed to push mirror trades",
    });
  }
};

module.exports = { pullMirrorTrades, pushMirrorTradeData };
