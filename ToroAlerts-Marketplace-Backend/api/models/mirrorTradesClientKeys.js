const mongoose = require("mongoose");

const MirrorTradesClientKeySchema = new mongoose.Schema(
  {
    associatedUserEmail: {
      type: String,
      required: true,
    },
    associatedUsername: {
      type: String,
      required: true,
    },
    mirrorTradeEntity: {
      type: String,
      required: true,
      enum: ["crypto", "stocks"],
      default: "crypto",
    },
    platform: {
      type: String,
      required: true,
    },
    clientId: {
      type: String,
      required: true,
    },
    clientSecret: {
      type: String,
      required: true,
    },
    validated: {
      type: Boolean,
      required: true,
      default: false,
    },
    clientInformation: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      demographics: {
        type: Object,
      },
    },
  },
  {
    timestamps: true,
  }
);

const MirrorTradesClientKeyModel = mongoose.model(
  "mirrortradesclientkeys",
  MirrorTradesClientKeySchema
);

module.exports = MirrorTradesClientKeyModel;
