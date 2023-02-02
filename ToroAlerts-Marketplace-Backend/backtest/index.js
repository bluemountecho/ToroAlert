const CronJob = require("node-cron");

const BacktestModel = require("../api/models/backtest");
const AlgorithmModel = require("../api/models/algorithm");

exports.initCheckBacktests = () => {
  const checkBacktests = CronJob.schedule("*/5 * * * *", async() => {
    console.log("I'm executed on a schedule!");
    // Checking backtests from db and update with the dummy data.
    const report = {
      "returns": {
        "days_30": 7.14,
        "days_90": 12.42,
        "year_1": 34.12,
        "year_3": 76.21,
        "year_5": 215.82
      },
      "summary": [
        {
          "key": "ROI %(1-Year)",
          "value": "34.12%",
          "_id": "626070debde361baf10de6d7"
        },
        {
          "key": "Number Of Trades",
          "value": "458",
          "_id": "626070debde361baf10de6d8"
        },
        {
          "key": "Number Of Wins",
          "value": "357",
          "_id": "626070debde361baf10de6d9"
        },
        {
          "key": "Number Of Loss",
          "value": "101",
          "_id": "626070debde361baf10de6da"
        },
        {
          "key": "Hit Ratio",
          "value": "77.95%",
          "_id": "626070debde361baf10de6db"
        },
        {
          "key": "Average Trades Per Day",
          "value": "3",
          "_id": "626070debde361baf10de6dc"
        },
        {
          "key": "Average Profit Per Winning Trade",
          "value": "7.31%",
          "_id": "626070debde361baf10de6dd"
        },
        {
          "key": "Average Profit Per Losing Trade",
          "value": "-2.29%",
          "_id": "626070debde361baf10de6de"
        },
        {
          "key": "maximumGainDay",
          "value": "13.4%",
          "_id": "626070debde361baf10de6df"
        },
        {
          "key": "maximumLossDay",
          "value": "-8.42%",
          "_id": "626070debde361baf10de6e0"
        },
        {
          "key": "maximumGainWeek",
          "value": "26.4%",
          "_id": "626070debde361baf10de6e1"
        },
        {
          "key": "maximumLossWeek",
          "value": "-9.42%",
          "_id": "626070debde361baf10de6e2"
        },
        {
          "key": "maximumGainMonth",
          "value": "33.24%",
          "_id": "626070debde361baf10de6e3"
        },
        {
          "key": "maximumLossMonth",
          "value": "-18.92%",
          "_id": "626070debde361baf10de6e4"
        }
      ],
      "tradingHistory": [
        {
          "ticker": "AAPL",
          "buyDate": "07/04/2022",
          "buyPrice": 123,
          "sellDate": "07/04/2022",
          "sellPrice": 246,
          "gains": 100,
          "amountInvested": 123,
          "_id": "626070debde361baf10de6d3"
        },
        {
          "ticker": "AAPL",
          "buyDate": "08/04/2022",
          "buyPrice": 123,
          "sellDate": "08/04/2022",
          "sellPrice": 246,
          "gains": 100,
          "amountInvested": 123,
          "_id": "626070debde361baf10de6d4"
        },
        {
          "ticker": "GOOG",
          "buyDate": "07/04/2022",
          "buyPrice": 123,
          "sellDate": "07/04/2022",
          "sellPrice": 246,
          "gains": 100,
          "amountInvested": 123,
          "_id": "626070debde361baf10de6d5"
        },
        {
          "ticker": "GOOG",
          "buyDate": "08/04/2022",
          "buyPrice": 123,
          "sellDate": "08/04/2022",
          "sellPrice": 246,
          "gains": 100,
          "amountInvested": 123,
          "_id": "626070debde361baf10de6d6"
        }
      ]
    }

    try {
      const backtest = await BacktestModel.updateMany(
        { status: "pending" },
        { 
          $set: {
            status: "approved",
            report: report,
          },
        }
      );

      if (!backtest) {
        throw new CustomError("backtest updating failed");
      }


      const algorithm = await AlgorithmModel.updateMany(
        { 
          status: "pending",
          "backTest.submitted": true,
        },
        {
          $set: {
            status: "approved",
            "backTest.approved": true,
          },
        }
      )


      if (!algorithm) {
        throw new CustomError("algorithm update failed");
      }

    } catch (error) {
      console.log(error);
    }
  });

  checkBacktests.start();
}