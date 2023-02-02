const mongoose = require("mongoose");

const TriggerSchema = new mongoose.Schema(
  {
    triggerType: {
      type: String,
      required: true,
      enum: ["buy", "sell"],
    },
    adosc: {
      _id: false,
      applied: { type: Boolean, required: true, default: false },
      notification: { type: String, required: true, default: "NIL" },
      above: {
        type: Number,
        // required: true,
        //    default: 0,
      },
      below: {
        type: Number,
        // required: true,
        //    default: 0,
      },
    },
    adx: {
      _id: false,
      applied: { type: Boolean, required: true, default: false },
      notification: { type: String, required: true, default: "NIL" },
      above: {
        type: Number,
        // required: true,
        //    default: 0,
      },
      below: {
        type: Number,
        // required: true,
        //    default: 0,
      },
    },
    atr: {
      _id: false,
      applied: { type: Boolean, required: true, default: false },
      notification: { type: String, required: true, default: "NIL" },
      below1x: {
        type: Boolean,
        // required: true,
        // default: false,
      },
      below2x: {
        type: Boolean,
        // required: true,
        //   default: false,
      },
      below3x: {
        type: Boolean,
        // required: true,
        //  default: false,
      },
    },
    bbands: {
      _id: false,
      applied: { type: Boolean, required: true, default: false },
      notification: { type: String, required: true, default: "NIL" },
      aboveSqueeze: {
        type: Boolean,
        // required: true,
        //         default: false,
      },
      belowSqueeze: {
        type: Boolean,
        // required: true,
        //         default: false,
      },
      aboveBand: {
        type: Boolean,
        // required: true,
        //         default: false,
      },
      belowBand: {
        type: Boolean,
        // required: true,
        //         default: false,
      },
    },
    coppock: {
      _id: false,
      applied: { type: Boolean, required: true, default: false },
      notification: { type: String, required: true, default: "NIL" },
      above: {
        type: Number,
        // required: true,
        //    default: 0,
      },
      below: {
        type: Number,
        // required: true,
        //    default: 0,
      },
    },
    beta: {
      _id: false,
      applied: { type: Boolean, required: true, default: false },
      notification: { type: String, required: true, default: "NIL" },
      above: {
        type: Number,
        // required: true,
        //    default: 0,
      },
      below: {
        type: Number,
        // required: true,
        //    default: 0,
      },
    },
    macd: {
      _id: false,
      applied: { type: Boolean, required: true, default: false },
      notification: { type: String, required: true, default: "NIL" },
      signalIntersection: {
        type: Boolean,
        // required: true,
        //         default: false,
      },
      above: {
        type: Number,
        // required: true,
        //    default: 0,
      },
      below: {
        type: Number,
        // required: true,
        //    default: 0,
      },
      uptrend: {
        type: Boolean,
        // required: true,
        //         default: false,
      },
      downtrend: {
        type: Boolean,
        // required: true,
        //         default: false,
      },
    },
    obv: {
      _id: false,
      applied: { type: Boolean, required: true, default: false },
      notification: { type: String, required: true, default: "NIL" },
      upwards: {
        type: Boolean,
        // required: true,

        //         default: false,
      },
      downwards: {
        type: Boolean,
        // required: true,
        //         default: false,
      },
    },
    ppo: {
      _id: false,
      applied: { type: Boolean, required: true, default: false },
      notification: { type: String, required: true, default: "NIL" },
      above: {
        type: Number,
        // required: true,
        //    default: 0,
      },
      below: {
        type: Number,
        // required: true,
        //    default: 0,
      },
      signalAbove: {
        type: Number,
        // required: true,
        //    default: 0,
      },
      signalBelow: {
        type: Number,
        // required: true,
        //    default: 0,
      },
      signalIntersection: {
        type: Boolean,
        // required: true,
        //         default: false,
      },
    },
    rsi: {
      _id: false,
      applied: { type: Boolean, required: true, default: false },
      notification: { type: String, required: true, default: "NIL" },
      above: {
        type: Number,
        // required: true,
        //    default: 0,
      },
      below: {
        type: Number,
        // required: true,
        //    default: 0,
      },
    },
    stddev: {
      _id: false,
      applied: { type: Boolean, required: true, default: false },
      notification: { type: String, required: true, default: "NIL" },
      days: {
        type: Number,
        // required: true,
        //    default: 0,
        validate: {
          validator: Number.isInteger,
          message: "Provide a valid interger for STDDEV Days",
        },
      },
    },
    stoch: {
      _id: false,
      applied: { type: Boolean, required: true, default: false },
      notification: { type: String, required: true, default: "NIL" },
      above: {
        type: Number,
        // required: true,
        //    default: 0,
      },
      below: {
        type: Number,
        // required: true,
        //    default: 0,
      },
    },
    vwap: {
      _id: false,
      applied: { type: Boolean, required: true, default: false },
      notification: { type: String, required: true, default: "NIL" },
      type: {
        type: String,
        // required: true,
        enum: ["nil", "low", "close", "high"],
        default: "nil",
      },
      daysAbove: {
        type: Number,
        // required: true,
        //    default: 0,
        validate: {
          validator: Number.isInteger,
          message: "Provide a valid interger for VWAP Days",
        },
      },
      daysBelow: {
        type: Number,
        // required: true,
        //    default: 0,
        validate: {
          validator: Number.isInteger,
          message: "Provide a valid interger for VWAP Days",
        },
      },
      vwapOf: {
        type: String,
        // required: true,
        enum: [
          "nil",
          "low",
          "close",
          "high",
          "(low+high+close)/3",
          "(low+high+close+open)/4",
        ],
        default: "nil",
      },
    },
    mfi: {
      _id: false,
      applied: { type: Boolean, required: true, default: false },
      notification: { type: String, required: true, default: "NIL" },
      above: {
        type: Number,
        // required: true,
        //    default: 0,
      },
      below: {
        type: Number,
        // required: true,
        //    default: 0,
      },
    },
    smaPM: {
      _id: false,
      applied: { type: Boolean, required: true, default: false },
      notification: { type: String, required: true, default: "NIL" },
      sma: {
        type: String,
        // required: true,
        enum: ["nil", "high", "low", "close"],
        default: "nil",
      },
      above: {
        type: Number,
        // required: true,
        //    default: 0,
        validate: {
          validator: Number.isInteger,
          message: "Days have to be an integer, for SMA calculation",
        },
      },
      below: {
        type: Number,
        // required: true,
        //    default: 0,
        validate: {
          validator: Number.isInteger,
          message: "Days have to be an integer, for SMA calculation",
        },
      },
    },
    smaI: {
      _id: false,
      applied: { type: Boolean, required: true, default: false },
      notification: { type: String, required: true, default: "NIL" },
      intersection1: {
        type: Number,
        // required: true,
        //    default: 0,
        validate: {
          validator: Number.isInteger,
          message: "Days have to be an integer, for SMA calculation",
        },
      },
      condition: {
        type: String,
        // required: true,
        enum: ["nil", "lesser", "greater"],
        default: "nil",
      },
      intersection2: {
        type: Number,
        // required: true,
        //    default: 0,
        validate: {
          validator: Number.isInteger,
          message: "Days have to be an integer, for SMA calculation",
        },
      },
    },
    emaPM: {
      _id: false,
      applied: { type: Boolean, required: true, default: false },
      notification: { type: String, required: true, default: "NIL" },
      ema: {
        type: String,
        // required: true,
        enum: ["nil", "high", "low", "close"],
        default: "nil",
      },
      above: {
        type: Number,
        // required: true,
        //    default: 0,
        validate: {
          validator: Number.isInteger,
          message: "Days have to be an integer, for EMA calculation",
        },
      },
      below: {
        type: Number,
        // required: true,
        //    default: 0,
        validate: {
          validator: Number.isInteger,
          message: "Days have to be an integer, for EMA calculation",
        },
      },
    },
    emaI: {
      _id: false,
      applied: { type: Boolean, required: true, default: false },
      notification: { type: String, required: true, default: "NIL" },
      intersection1: {
        type: Number,
        // required: true,
        //    default: 0,
        validate: {
          validator: Number.isInteger,
          message: "Days have to be an integer, for EMA calculation",
        },
      },
      condition: {
        type: String,
        // required: true,
        enum: ["nil", "lesser", "greater"],
        default: "nil",
      },
      intersection2: {
        type: Number,
        // required: true,
        //    default: 0,
        validate: {
          validator: Number.isInteger,
          message: "Days have to be an integer, for EMA calculation",
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

const TriggerModel = mongoose.model("triggers", TriggerSchema);

module.exports = TriggerModel;
