const mongoose = require("mongoose");
const { CustomError } = require("../utils/error-handlers");
const StocksSchema = new mongoose.Schema(
  {
    ticker: {
      type: String,
      required: true,
      unique: true,
    },
    sector: {
      type: String,
      required: true,
      default: "any",
    },
    fullName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

StocksSchema.statics.doStocksExist = function (tickers) {
  return new Promise((res, rej) => {
    const tickersQuery = tickers.map((ticker) => ({ ticker }));
    this.find(
      { $or: tickersQuery },
      {
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
      },
      (err, stocks) => {
        if (err) {
          return rej({
            type: "custom_err",
            message: "Failed to get stock, make sure it exists",
          });
        } else {
          if (stocks.length !== tickers.length) {
            return rej(new CustomError("Please provide valid tickers"));
          }
          res();
        }
      }
    ).lean();
  });
};
const StocksModel = mongoose.model("stocks", StocksSchema);

module.exports = StocksModel;
