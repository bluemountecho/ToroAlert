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
import ExponentialMovingAverageIntersection from "./components/ExponentialMovingAverageIntersection";
import StandardDeviation from "./components/StandardDeviation";
import SimpleMovingAverageIntersection from "./components/SimpleMovingAverageIntersection";
import VolumeWeightedAveragePrice from "./components/VolumeWeightedAveragePrice";
import BollingerBands from "./components/BollingerBands";
import { useNavigate } from "react-router-dom";
import SimpleMovingAveragePriceAction from "./components/SimpleMovingAveragePriceAction";
import ExponentialMovingAveragePriceAction from "./components/ExponentialMovingAveragePriceAction";

const ConfigureBuyTriggers = ({ buyTriggerData, setBuyTriggerData }) => {
  console.log("buy triggers data", buyTriggerData);
  const [buyTriggers, setBuyTriggers] = useState({
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
      isSelected: false,
      notification: "",
    },
    emaI: {
      intersection1: 0,
      condition: "nil",
      intersection2: 0,
      isSelected: false,
      notification: "",
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
      isSelected: false,
      notification: "",
    },
    smaI: {
      intersection1: 0,
      condition: "nil",
      intersection2: 0,
      isSelected: false,
      notification: "",
    },
  });

  const updateIndicator = useCallback((key, value) => {
    setBuyTriggers((prev) => {
      prev[key] = value;
      return { ...prev };
    });
  }, []);

  const navigate = useNavigate();
  console.log("buyTriggers", buyTriggers);

  const addBuyTriggerHandler = () => {
    let addedTriggers = {};

    for (let key in buyTriggers) {
      //console.log("key", buyTriggers[key].isSelected);
      if (buyTriggers[key].isSelected) {
        addedTriggers = { ...addedTriggers, [key]: buyTriggers[key] };
      }
    }
    setBuyTriggerData([...buyTriggerData, addedTriggers]);
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
          Configure Buy Triggers
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
          onClick={addBuyTriggerHandler}
          innerText="Add Buy Trigger"
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

export default ConfigureBuyTriggers;
