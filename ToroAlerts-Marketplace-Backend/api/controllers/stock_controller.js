const { CustomError } = require("../utils/error-handlers");
const StocksModel = require("../models/stocks");
const { sanitize } = require("../utils/data-handlers");
const getAllTickers = async (req, res) => {
  try {
    const tickerId = req;
    const stocks = await StocksModel.find(
      {},
      { _id: 0, ticker: 1, fullName: 1 }
    );
    res.status(200).json({ success: true, stocks });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message:
        err.type === "custom_err" ? err.message : "Failed to get stocks data",
    });
  }
};

const getStockData = async (req, res) => {
  try {
    const tickerId = sanitize(req.params.tickerId);
    const stock = await StocksModel.findOne({ ticker: tickerId });
    if (!stock) {
      return res
        .status(404)
        .json({ success: false, message: `No stock by ticker Id ${tickerId}` });
    }
    res.status(200).json({ success: true, stock });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message:
        err.type === "custom_err" ? err.message : "Failed to get stock data",
    });
  }
};

module.exports = { getAllTickers, getStockData };
