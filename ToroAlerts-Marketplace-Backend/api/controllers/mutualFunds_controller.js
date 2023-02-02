const MutualFundsModel = require("../models/mutualFund");
const { sanitize } = require("../utils/data-handlers");
const matchMutualFund = async (req, res) => {
  try {
    const filterQuery = req.params.ticker
      ? { ticker: {$regex : sanitize(req.params.ticker), $options : 'i'} }
      : {};
    const mutualFunds = await MutualFundsModel.aggregate([
      {
        $match: filterQuery,
      },
      {
        $lookup: {
          from: "algorithms",
          localField: "algorithmsMatched",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                __v: 0,
                _id: 0,
                locked: 0,
                version: 0,
                lastBacktestVersion: 0,
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
              $project: {
                code: 1,
                backtestData: 1,
              },
            },
          ],
          as: "algorithmsData",
        },
      },
    ]);
    res.status(200).json({ success: true, mutualFunds });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message:
        "Failed to match mutual funds with algorithms, make sure you have provided proper input",
    });
  }
};
module.exports = { matchMutualFund };
