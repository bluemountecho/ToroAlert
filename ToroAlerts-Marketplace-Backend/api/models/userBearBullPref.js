const mongoose = require("mongoose");

const UserBearBullPrefrencesSchema = new mongoose.Schema(
  {
    associatedUserEmail: {
      type: String,
      required: true,
      unique: true,
    },
    algorithm: {
      type: mongoose.Types.ObjectId,
      ref: "algorithms",
    },
    above: {
      activated: {
        type: Boolean,
        required: true,
        default: false,
      },
      rating: {
        type: Number,
        default: null,
      },
    },
    below: {
      activated: {
        type: Boolean,
        required: true,
        default: false,
      },
      rating: {
        type: Number,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  }
);

const UserBearBullPreferencesModel = mongoose.model(
  "userbearbullpreferences",
  UserBearBullPrefrencesSchema
);

module.exports = UserBearBullPreferencesModel;
