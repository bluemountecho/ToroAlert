import React, { useCallback, useState } from "react";
import BackArrow from "../../assets/SVG/back-arrow";
import Button from "../Button/Button";
import ChaikinADOscillator from "./components/ChaikinADOscillator";
import AverageDirectionalIndex from "./components/AverageDirectionalIndex";
import AverageTrueRange from "./components/AverageTrueRange";
import CoppockCurve from "./components/CoppockCurve";
import Beta from "./components/Beta";
import MovingAverageConvergenceDivergence from "./components/MovingAverageConvergenceDivergence";
import OnBalanceVolume from "./components/OnBalanceVolume";
import PricePercentageOscillator from "./components/PricePercentageOscillator";
import RelativeStrengthIndex from "./components/RelativeStrengthIndex";
import StochasticOscillator from "./components/StochasticOscillator";
import MoneyFlowIndex from "./components/MoneyFlowIndex";
import StandardDeviation from "./components/StandardDeviation";
import VolumeWeightedAveragePrice from "./components/VolumeWeightedAveragePrice";
import BollingerBands from "./components/BollingerBands";
import { useNavigate } from "react-router-dom";
import SimpleMovingAveragePriceAction from "./components/SimpleMovingAveragePriceAction";
import SimpleMovingAverageIntersection from "./components/SimpleMovingAverageIntersection";
import ExponentialMovingAverageIntersection from "./components/ExponentialMovingAverageIntersection";
import ExponentialMovingAveragePriceAction from "./components/ExponentialMovingAveragePriceAction";

const ConfigureSellTriggers = ({ sellTriggerData, setSellTriggerData }) => {
  const [sellTriggers, setSellTriggers] = useState({
    adosc: {
      above: 0,
      below: 0,
      isSelected: false,
      notification: "",
    },
    adx: {
      above: 0,
      below: 0,
      isSelected: false,
      notification: "",
    },
    atr: {
      below1x: false,
      below2x: false,
      below3x: false,
      isSelected: false,
      notification: "",
    },
    bbands: {
      aboveSqueeze: false,
      belowSqueeze: false,
      aboveBand: false,
      belowBand: false,
      isSelected: false,
      notification: "",
    },
    coppock: {
      above: 0,
      below: 0,
      isSelected: false,
      notification: "",
    },
    beta: {
      above: 0,
      below: 0,
      isSelected: false,
      notification: "",
    },
    emaPM: {
      ema: "nil",
      above: 0,
      below: 0,
    },
    emaI: {
      intersection1: 0,
      condition: "nil",
      intersection2: 0,
    },
    macd: {
      signalIntersection: false,
      above: 0,
      below: 0,
      uptrend: false,
      downtrend: false,
      isSelected: false,
      notification: "",
    },
    obv: {
      upwards: false,
      downwards: false,
      isSelected: false,
      notification: "",
    },
    ppo: {
      above: 0,
      below: 0,
      signalAbove: 0,
      signalBelow: 0,
      signalIntersection: false,
      isSelected: false,
      notification: "",
    },
    rsi: {
      above: 0,
      below: 0,
      isSelected: false,
      notification: "",
    },
    stddev: {
      days: 0,
      isSelected: false,
      notification: "",
    },
    stoch: {
      above: 0,
      below: 0,
      isSelected: false,
      notification: "",
    },
    vwap: {
      type: "nil",
      daysAbove: 0,
      daysBelow: 0,
      vwapOf: "nil",
      isSelected: false,
      notification: "",
    },

    mfi: {
      above: 0,
      below: 0,
      isSelected: false,
      notification: "",
    },
    smaPM: {
      sma: "nil",
      above: 0,
      below: 0,
    },
    smaI: {
      intersection1: 0,
      condition: "nil",
      intersection2: 0,
    },
  });

  const updateIndicator = useCallback((key, value) => {
    setSellTriggers((prev) => {
      prev[key] = value;
      return { ...prev };
    });
  }, []);

  const navigate = useNavigate();
  console.log("sellTriggers", sellTriggers);

  const addSellTriggerHandler = () => {
    let addedTriggers = {};

    for (let key in sellTriggers) {
      //console.log("key", buyTriggers[key].isSelected);
      if (sellTriggers[key].isSelected) {
        addedTriggers = { ...addedTriggers, [key]: sellTriggers[key] };
      }
    }
    setSellTriggerData([...sellTriggerData, addedTriggers]);
    navigate(-1);

    console.log("addedTriggers", addedTriggers);
  };
  return (
    <div className="max-w-screen px-20 py-14">
      <div className="flex items-center space-x-3">
        <BackArrow
          onClick={() => navigate(-1)}
          className="w-9 h-9 cursor-pointer"
        />
        <span className="text-4xl font-bold text-primary-blue">
          Configure Sell Triggers
        </span>
      </div>
      <div className="mt-10 flex space-x-20">
        <div>
          <h3 className="text-xl text-primary-blue font-semibold">
            Indicators List
          </h3>
          <p className="text-base font-normal text-primary-blue">
            You can select multiple indicators to add into Technical Alert
          </p>
        </div>
        <Button
          onClick={addSellTriggerHandler}
          innerText="Add Sell Trigger"
          type="button"
          extraClass="text-md xl:text-lg text-primary-blue-lt bg-primary-yellow font-medium"
        />
      </div>
      <div>
        <ChaikinADOscillator updateIndicator={updateIndicator} />
        <AverageDirectionalIndex updateIndicator={updateIndicator} />
        <AverageTrueRange updateIndicator={updateIndicator} />
        <BollingerBands updateIndicator={updateIndicator} />
        <CoppockCurve updateIndicator={updateIndicator} />
        <Beta updateIndicator={updateIndicator} />
        <ExponentialMovingAveragePriceAction
          updateIndicator={updateIndicator}
        />
        <ExponentialMovingAverageIntersection
          updateIndicator={updateIndicator}
        />
        <MovingAverageConvergenceDivergence updateIndicator={updateIndicator} />
        <OnBalanceVolume updateIndicator={updateIndicator} />
        <PricePercentageOscillator updateIndicator={updateIndicator} />
        <RelativeStrengthIndex updateIndicator={updateIndicator} />
        <StandardDeviation updateIndicator={updateIndicator} />
        <StochasticOscillator updateIndicator={updateIndicator} />
        <VolumeWeightedAveragePrice updateIndicator={updateIndicator} />
        <MoneyFlowIndex updateIndicator={updateIndicator} />
        <SimpleMovingAveragePriceAction updateIndicator={updateIndicator} />
        <SimpleMovingAverageIntersection updateIndicator={updateIndicator} />
      </div>
    </div>
  );
};

export default ConfigureSellTriggers;
