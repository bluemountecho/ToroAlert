const mongoose = require("mongoose");
const MarketplaceUserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    myAlgorithms: [{ type: mongoose.Schema.Types.ObjectId, ref: "algorithms" }],
    favouriteAlgorithms: [
      { type: mongoose.Schema.Types.ObjectId, ref: "algorithms" },
    ],
    subscribedAlgorithms: [
      { type: mongoose.Schema.Types.ObjectId, ref: "algorithms" },
    ],
    favouriteMirrorTrades: [
      { type: mongoose.Schema.Types.ObjectId, ref: "mirrortrades" },
    ],
    subscribedMirrorTrades: [
      { type: mongoose.Schema.Types.ObjectId, ref: "mirrortrades" },
    ],
  },
  {
    timestamps: true,
  }
);

const MarketplaceUserModel = mongoose.model(
  "marketplaceusers",
  MarketplaceUserSchema
);

module.exports = MarketplaceUserModel;
