const mongoose = require("mongoose");
const LeaseSchema = new mongoose.Schema(
  {
    algorithm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "algorithms",
      required: true,
    },
    backtest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "backtests",
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
    price: {
      type: {
        type: String,
        required: true,
        enum: ["free", "monthly", "annually"],
        default: "free",
      },
      amount: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    leasedTo: {
      type: String,
      required: true,
      default: "admin@toroalerts.com",
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

LeaseSchema.virtual("leaseStatusObjectId").get(function () {
  return this._id;
});

const LeaseModel = mongoose.model("leases", LeaseSchema);

module.exports = LeaseModel;
