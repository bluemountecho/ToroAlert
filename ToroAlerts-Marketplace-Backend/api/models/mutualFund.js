const mongoose = require("mongoose");

const MutualFundsSchema = new mongoose.Schema(
  {
    ticker: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    returns: [
      {
        _id: false,

        period: {
          type: String,
          required: true,
        },
        value: {
          type: String,
          required: true,
        },
      },
    ],
    description: {
      type: String,
      required: true,
    },
    sectorWeightings: [
      {
        _id: false,
        sectorName: {
          type: String,
          required: true,
        },
        sharePercentage: {
          type: Number,
          required: true,
          min: 0,
          max: 100,
        },
      },
    ],
    algorithmsMatched: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "algorithms",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const MutualFundsModel = mongoose.model("mutualfunds", MutualFundsSchema);

module.exports = MutualFundsModel;
