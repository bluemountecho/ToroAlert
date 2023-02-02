import React, { useEffect, useState } from "react";
import ArrowRight from "../../../assets/SVG/arrow-right";
import CircularTick from "../../../assets/SVG/circular-tick";
import DropdownArrow from "../../../assets/SVG/dropdown-arrow";

const BollingerBands = ({ updateIndicator }) => {
  const [open, setOpen] = useState(false);
  const [priceMovesAbove, setPriceMovesAbove] = useState({
    isChecked: false,
    value: 0,
  });
  const [priceMovesBelow, setPriceMovesBelow] = useState({
    isChecked: false,
    value: 0,
  });
  const [breakoutAbove, setBreakoutAbove] = useState({
    isChecked: false,
    value: 0,
  });
  const [breakoutBelow, setBreakoutBelow] = useState({
    isChecked: false,
    value: 0,
  });

  useEffect(() => {
    const bbands = {
      aboveSqueeze: priceMovesAbove.isChecked,
      belowSqueeze: priceMovesBelow.isChecked,
      aboveBand: breakoutAbove.isChecked,
      belowBand: breakoutBelow.isChecked,
      isSelected: false,
      notification: "",
    };

    if (priceMovesAbove.isChecked) {
      bbands.isSelected = true;
      bbands.notification = "If price moves above the squeeze";
    }
    if (priceMovesBelow.isChecked) {
      bbands.isSelected = true;
      bbands.notification = "If price moves below the squeeze";
    }
    if (breakoutAbove.isChecked) {
      bbands.isSelected = true;
      bbands.notification = "If breakout above the bandR";
    }
    if (breakoutBelow.isChecked) {
      bbands.isSelected = true;
      bbands.notification = "If breakout below the bandR";
    }

    updateIndicator("bbands", bbands);
  }, [
    priceMovesAbove,
    priceMovesBelow,
    breakoutAbove,
    breakoutBelow,
    updateIndicator,
  ]);

  return (
    <div className="border-t border-ternary-blue p-5 mt-3 w-[70%]">
      <div className="flex items-center space-x-2">
        {!open && (
          <ArrowRight
            className="cursor-pointer h-5 w-5"
            onClick={() => setOpen(true)}
          />
        )}
        {open && (
          <DropdownArrow
            className="cursor-pointer h-5 w-5"
            onClick={() => setOpen(false)}
          />
        )}
        <h3 className="text-xl font-medium text-primary-blue">
          Bollinger Bands (BBANDS)
        </h3>
      </div>
      {open && (
        <div className="mx-5 my-3">
          <div className="mb-3 flex items-center space-x-5">
            <div
              onClick={() => {
                setPriceMovesAbove({
                  value: "OBV trending upwards",
                  isChecked: !priceMovesAbove.isChecked,
                });
                setPriceMovesBelow({ isChecked: false, value: 0 });
                setBreakoutAbove({ isChecked: false, value: 0 });
                setBreakoutBelow({ isChecked: false, value: 0 });
              }}
              className={
                priceMovesAbove.isChecked
                  ? "text-center cursor-pointer bg-white h-5 w-5 rounded-full"
                  : "cursor-pointer bg-white h-3 w-3 p-2 rounded-full border border-primary-blue"
              }
            >
              {priceMovesAbove.isChecked && (
                <CircularTick
                  fill="#002172"
                  className="h-5 w-5 cursor-pointer"
                />
              )}
            </div>
            <p className="text-base font-normal text-primary-blue">
              Price moves above the squeeze
            </p>
          </div>

          <div className="mb-3 flex items-center space-x-5">
            <div
              onClick={() => {
                setPriceMovesBelow({
                  value: "OBV trending upwards",
                  isChecked: !priceMovesBelow.isChecked,
                });
                setPriceMovesAbove({ isChecked: false, value: 0 });
                setBreakoutAbove({ isChecked: false, value: 0 });
                setBreakoutBelow({ isChecked: false, value: 0 });
              }}
              className={
                priceMovesBelow.isChecked
                  ? "text-center cursor-pointer bg-white h-5 w-5 rounded-full"
                  : "cursor-pointer bg-white h-3 w-3 p-2 rounded-full border border-primary-blue"
              }
            >
              {priceMovesBelow.isChecked && (
                <CircularTick
                  fill="#002172"
                  className="h-5 w-5 cursor-pointer"
                />
              )}
            </div>
            <p className="text-base font-normal text-primary-blue">
              Price moves above the squeeze
            </p>
          </div>

          <div className="mb-3 flex items-center space-x-5">
            <div
              onClick={() => {
                setBreakoutAbove({
                  value: "OBV trending upwards",
                  isChecked: !breakoutAbove.isChecked,
                });
                setPriceMovesBelow({ isChecked: false, value: 0 });
                setPriceMovesAbove({ isChecked: false, value: 0 });
                setBreakoutBelow({ isChecked: false, value: 0 });
              }}
              className={
                breakoutAbove.isChecked
                  ? "text-center cursor-pointer bg-white h-5 w-5 rounded-full"
                  : "cursor-pointer bg-white h-3 w-3 p-2 rounded-full border border-primary-blue"
              }
            >
              {breakoutAbove.isChecked && (
                <CircularTick
                  fill="#002172"
                  className="h-5 w-5 cursor-pointer"
                />
              )}
            </div>
            <p className="text-base font-normal text-primary-blue">
              Breakout above the bandR
            </p>
          </div>

          <div className="mb-3 flex items-center space-x-5">
            <div
              onClick={() => {
                setBreakoutBelow({
                  value: "OBV trending upwards",
                  isChecked: !breakoutBelow.isChecked,
                });
                setPriceMovesBelow({
                  isChecked: false,
                  value: 0,
                });
                setPriceMovesAbove({
                  isChecked: false,
                  value: 0,
                });
                setBreakoutAbove({
                  isChecked: false,
                  value: 0,
                });
              }}
              className={
                breakoutBelow.isChecked
                  ? "text-center cursor-pointer bg-white h-5 w-5 rounded-full"
                  : "cursor-pointer bg-white h-3 w-3 p-2 rounded-full border border-primary-blue"
              }
            >
              {breakoutBelow.isChecked && (
                <CircularTick
                  fill="#002172"
                  className="h-5 w-5 cursor-pointer"
                />
              )}
            </div>
            <p className="text-base font-normal text-primary-blue">
              Breakout below the bandR
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BollingerBands;
