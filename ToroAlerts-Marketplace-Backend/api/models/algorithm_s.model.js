module.exports = (sequelize, Sequelize) => {
    const Algorithm = sequelize.define("algorithms", {
      stocks: {
        type: Sequelize.STRING
      },
      stoploss: {
        type: Sequelize.STRING
      },
      min_capital: {
        type: Sequelize.NUMBER
      },
      max_capital: {
        type: Sequelize.NUMBER
      },
      algorithm_id: {
        type: Sequelize.STRING
      },
      backtest_id: {
        type: Sequelize.STRING
      }
    });
  
    return Algorithm;
};