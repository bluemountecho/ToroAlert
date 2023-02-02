const mongoose = require("mongoose");

const AlertSchema = new mongoose.Schema(
  {
    algorithmObjectId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    algorithmCode: {
      type: String,
      required: true,
      unique: true,
    },
    bearBullRating: {
      type: Number,
      required: true,
      default: 0,
    },
    alertsOnStock: [
      {
        _id: false,
        tickerId: { type: String, required: true },
        buyPrice: {
          type: Number,
          required: true,
        },
        sellPrice: {
          type: Number,
          required: true,
        },
        stopPrice: {
          type: Number,
          required: true,
        },
        signalType: {
          type: String,
          required: true,
          enum: ["buy", "sell"],
        },
        alertVersionUpdatedAt: {
          type: Number,
          required: true,
        },
      },
    ],
    currentVersion: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const AlertModel = mongoose.model("alerts", AlertSchema);

module.exports = AlertModel;
