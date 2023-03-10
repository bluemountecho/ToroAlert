const CronJob = require("node-cron");

const BacktestModel = require("../api/models/backtest");
const AlgorithmModel = require("../api/models/algorithm");

const db = require("../api/models");
const Backtest = db.backtests;
const Op = db.Sequelize.Op;


exports.initCheckBacktests = () => {
  const checkBacktests = CronJob.schedule("*/1 * * * *", async() => {
    console.log("I'm executed on a schedule!");

    try {

      const backtests = await Backtest.findAll({ where: { status: "waiting"}});

      backtests.forEach(async (backtest) => {
        const bt = await BacktestModel.updateOne(
          { _id: backtest.dataValues.backtest_id },
          { 
            $set: {
              status: "approved",
              report: JSON.parse(backtest.dataValues.report),
            },
          }
        );
  
        if (!bt) {
          throw new CustomError("backtest updating failed");
        }
  
  
        const algorithm = await AlgorithmModel.updateOne(
          { _id: backtest.dataValues.algorithm_id },
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
      });

      
      await Backtest.update({ status: "tested" }, {
        where: {
          status: "waiting"
        }
      });
    } catch (error) {
      console.log(error);
    }
  });

  checkBacktests.start();
}