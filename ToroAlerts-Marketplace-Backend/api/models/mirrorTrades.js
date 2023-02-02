const mongoose = require("mongoose");
const validator = require("validator");

const MirrorTradesSchema = new mongoose.Schema(
  {
    associatedUserEmail: {
      type: String,
      required: true,
    },
    associatedUsername: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      required: true,
    },
    keysVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    associatedClientKeys: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "mirrortradesclientkey",
      unique: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    report: {
      summary: [
        {
          id: false,
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
          _id: false,
          ticker: {
            type: String,
            required: true,
          },
          buyDate: {
            type: String,
          },
          buyPrice: {
            type: Number,
          },
          buyUnit: {
            type: Number,
          },
          sellDate: {
            type: String,
          },
          sellPrice: {
            type: Number,
          },
          sellUnit: {
            type: Number,
          },
          gains: {
            type: Number,
          },
          amountInvested: {
            type: Number,
          },
        },
      ],
    },
    minCapital: {
      type: Number,
      required: true,
      default: 1000,
    },
    maxCapital: {
      type: Number,
      required: true,
      default: 10000,
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
    public: {
      type: Boolean,
      required: true,
      default: false,
    },
    //right now using this filed ... will improve later on mirrorTradeObjectId as per cap mt
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
  {
    timestamps: true,
    // toJSON: {
    //   virtuals: true,
    // },
    // toObject: {
    //   virtuals: true,
    // },
  }
);

// MirrorTradesSchema.virtual("mirrorTradeObjectId").get(function () {
//   return this._id;
// });

MirrorTradesSchema.statics.doesMirrorTradeExist = function (code) {
  return new Promise((res, rej) => {
    this.findOne(
      { code },
      {
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
        price: 0,
      },
      (err, data) => {
        if (err || !data) {
          return rej({
            type: "custom_err",
            message: "Failed to get mirror trade, make sure it exists",
          });
        } else {
          return res({ mirrorTradeObjectId: data._id, ...data });
        }
      }
    ).lean();
  });
};

const MirrorTradesModel = mongoose.model("mirrortrades", MirrorTradesSchema);

module.exports = MirrorTradesModel;
