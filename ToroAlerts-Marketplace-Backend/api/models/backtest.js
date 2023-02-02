const mongoose = require("mongoose");
const BacktestSchema = new mongoose.Schema(
  {
    algorithm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "algorithms",
      required: true,
    },
    algorithmVersion: {
      type: Number,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: "Version can only be integer, as per logic",
      },
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    algorithmData: {
      type: Object,
      required: true,
    },
    report: {
      summary: [
        {
          key: {
            type: String,
            required: true,
          },
          value: {
            type: String,
            required: true,
          },
        },
      ],
      returns: {
        days_30: {
          type: Number,
          required: true,
          default: 0,
        },
        days_90: {
          type: Number,
          required: true,
          default: 0,
        },
        year_1: {
          type: Number,
          required: true,
          default: 0,
        },
        year_3: {
          type: Number,
          required: true,
          default: 0,
        },
        year_5: {
          type: Number,
          required: true,
          default: 0,
        },
      },
      tradingHistory: [
        {
          ticker: {
            type: String,
            required: true,
          },
          buyDate: {
            type: String,
            required: true,
          },
          buyPrice: {
            type: Number,
            required: true,
          },
          sellDate: {
            type: String,
            required: true,
          },
          sellPrice: {
            type: Number,
            required: true,
          },
          gains: {
            type: Number,
            required: true,
          },
          amountInvested: {
            type: Number,
            required: true,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

BacktestSchema.virtual("backtestObjectId").get(function () {
  return this._id;
});

const BacktestModel = mongoose.model("backtests", BacktestSchema);
module.exports = BacktestModel;
