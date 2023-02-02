const BacktestModel = require("../../api/models/backtest");
const AlgorithmModel = require("../../api/models/algorithm");

const { CustomError } = require("../../api/utils/error-handlers");
const { sanitize } = require("../../api/utils/data-handlers");

const allowedBacktestStatus = ["approved", "rejected"];

const getBacktestData = async (req, res) => {
  try {
    const pendingAlgorithms = await BacktestModel.find(
      {
        status: "pending",
      },
      { report: 0, id: 0, createdAt: 0, updatedAt: 0, __v: 0 }
    );
    res.status(200).json({ backtestData: pendingAlgorithms });
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

const postBacktestData = async (req, res) => {
  try {
    const backtestObjectId = sanitize(req.body.backtestObjectId);
    const status = sanitize(req.body.status);
    const report = JSON.parse(JSON.stringify(req.body.report));
    if (!allowedBacktestStatus.includes(status)) {
      throw new CustomError("status not allowed");
    }

    const backtest = await BacktestModel.findOneAndUpdate(
      { _id: backtestObjectId },
      {
        $set: {
          status: status,
          report: report,
        },
      },
      {
        runValidators: true,
        new: false,
      }
    );
    if (!backtest) {
      throw new CustomError("Please make sure backtest Id exists");
    }
    const { algorithm, algorithmVersion } = backtest;
    const algoithmUpdateRes = await AlgorithmModel.updateOne(
      { _id: algorithm, version: algorithmVersion, locked: false },
      {
        $set: {
          "backTest.approved": status === "approved" ? true : false,
          status: status === "approved" ? "pending" : "rejected",
        },
      },
      {
        runValidators: true,
      }
    ); // this will update the algo if the backtest matches with current verison of algo
    if (
      algoithmUpdateRes.matchedCount !== 1 ||
      algoithmUpdateRes.modifiedCount !== 1
    ) {
      throw new CustomError(
        "Backtest updated, algorithm not updated, looks like moved to a new version or locked"
      );
    }
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message:
        err.type === "custom_err"
          ? err.message
          : "Failed to submit backtest report",
    });
  }
};

module.exports = { getBacktestData, postBacktestData };
