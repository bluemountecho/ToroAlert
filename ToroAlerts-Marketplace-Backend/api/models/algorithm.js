const mongoose = require("mongoose");
const validator = require("validator");
const AlgorithmSchema = new mongoose.Schema(
  {
    associatedUserEmail: {
      type: String,
      required: true,
    },
    associatedUsername: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      get: (code) => code.toUpperCase(),
    },
    version: {
      type: Number,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: "Version can only be integer",
      },
      default: 0,
    },
    lastBacktestVersion: {
      type: Number,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: "Version can only be integer",
      },
      default: 0,
    },
    minCapital: {
      type: Number,
      required: true,
      default: 0,
    },
    maxCapital: {
      type: Number,
      required: true,
      default: 0,
    },
    stocks: [
      {
        _id: false,
        tickerId: {
          type: String,
          required: true,
          unique: true,
        },
        assetAllocationPercentage: {
          type: Number,
          required: true,
          max: 100,
          min: 0,
        },
        triggers: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "triggers",
          },
        ],
      },
    ],
    stopLoss: {
      _id: false,
      active: {
        type: Boolean,
        required: true,
        default: false,
      },
      type: {
        type: String,
        required: true,
        enum: ["no", "fixed", "trailing"],
        default: "no",
      },
      percentValue: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
        default: 0,
      },
    },
    backTest: {
      _id: false,
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "backtests",
        default: null,
      },
      submitted: {
        type: Boolean,
        required: true,
        default: false,
      },
      approved: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    leaseStatus: {
      _id: false,
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "leases",
        default: null,
      },
      submitted: {
        type: Boolean,
        required: true,
        default: false,
      },
      approved: {
        type: Boolean,
        required: true,
        default: false,
      },
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
    locked: {
      type: Boolean,
      required: true,
      default: false,
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "approved", "pending", "rejected", "notSubmitted"],
      default: "notSubmitted",
    },
    bearBullRating: {
      type: Number,
      required: true,
      default: 0,
    },
    public: {
      type: Boolean,
      required: true,
      default: false,
    },
    //right now using this filed ... will improve later on algoObjectId as per cap algo
    usersSubscribed: [
      {
        type: String,
        validate(val) {
          if (!validator.isEmail(val)) {
            throw new Error("The email entered is invalid");
          }
        },
      },
    ],
  },
  { timestamps: true }
);

// this methods helps in querying if algorithm exists, hence returning the document id and code
AlgorithmSchema.statics.doesAlgorithmExist = function (code) {
  return new Promise((res, rej) => {
    this.findOne(
      { code },
      {
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
        price: 0,
        leaseStatus: 0,
        backTest: 0,
      },
      (err, data) => {
        if (err || !data) {
          return rej({
            type: "custom_err",
            message: "Failed to get algorithm, make sure it exists",
          });
        } else {
          return res({ algorithmObjectId: data._id, ...data });
        }
      }
    ).lean();
  });
};

AlgorithmSchema.statics.stocksInAlgorithm = function (code) {
  return new Promise((res, rej) => {
    this.findOne(
      { code },
      {
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
        price: 0,
        leaseStatus: 0,
        backTest: 0,
      },
      (err, algo) => {
        if (err || !algo) {
          return rej({
            type: "custom_err",
            message: "Failed to get algorithm, make sure it exists",
          });
        } else {
          let totalAllocationPercentage = 0;
          const stocksInAlgorithm = algo.stocks.map(
            ({ tickerId, assetAllocationPercentage }) => {
              totalAllocationPercentage += assetAllocationPercentage;
              return tickerId;
            }
          );
          return res({
            algorithmObjectId: algo._id,
            ...algo,
            totalAllocationPercentage,
            stocksInAlgorithm,
          });
        }
      }
    ).lean();
  });
};

AlgorithmSchema.statics.updateBearBullRating = function (code, bearBullRating) {
  return new Promise((res, rej) => {
    this.findOneAndUpdate(
      { code },
      {
        $set: {
          bearBullRating,
        },
      },
      {
        runValidators: true,
        new: true,
      },
      (err, algo) => {
        // console.log(err, algo);
        if (err || !algo) {
          return rej({
            type: "custom_err",
            message: "Failed to get algorithm, make sure it exists",
          });
        } else {
          const stocksInAlgorithm = algo.stocks.map(({ tickerId }) => {
            return tickerId;
          });
          return res({
            algorithmObjectId: algo._id,
            ...algo,
            stocksInAlgorithm,
          });
        }
      }
    ).lean();
  });
};

const AlgorithmModel = mongoose.model("algorithms", AlgorithmSchema);
module.exports = AlgorithmModel;
