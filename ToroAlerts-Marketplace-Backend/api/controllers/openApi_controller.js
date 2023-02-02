const AlgorithmModel = require("../models/algorithm");

const getTopPerformingAlgorithms = async (req, res) => {
  try {
    const topPerformingAlgorithms = await AlgorithmModel.aggregate([
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
        $project: {
          _id: 0,
          __v: 0,
          // createdAt: 0,
          // updatedAt: 0,
          usersSubscribed: 0,
          lastBacktestVersion: 0,
          locked: 0,
          version: 0,
        },
      },
    ]);
    res.status(200).json({ success: true, topPerformingAlgorithms });
  } catch (err) {
    console.log(err);
    res.status(403).json({
      success: false,
      message:
        err.type === "custom_err"
          ? err.message
          : "Failed to get top performing algorithms",
    });
  }
};

module.exports = { getTopPerformingAlgorithms };
