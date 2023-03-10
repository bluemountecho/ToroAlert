module.exports = (sequelize, Sequelize) => {
    const Backtest = sequelize.define("backtests", {
      report: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      algorithm_id: {
        type: Sequelize.STRING
      },
      backtest_id: {
        type: Sequelize.STRING
      }
    });
  
    return Backtest;
};