import React, { useEffect, useState } from "react";
import ArrowRight from "../../../assets/SVG/arrow-right";
import CircularTick from "../../../assets/SVG/circular-tick";
import DropdownArrow from "../../../assets/SVG/dropdown-arrow";

const MovingAverageConvergenceDivergence = ({ updateIndicator }) => {
  const [open, setOpen] = useState(false);
  const [movesAbove, setMovesAbove] = useState({ isChecked: false, value: 0 });
  const [movesBelow, setMovesBelow] = useState({ isChecked: false, value: 0 });
  const [signalIntersection, setSignalIntersection] = useState({
    isChecked: false,
    value: "",
  });
  const [uptrend, setUptrend] = useState({ isChecked: false, value: "" });
  const [downtrend, setDowntrend] = useState({ isChecked: false, value: "" });

  useEffect(() => {
    const macd = {
      signalIntersection: signalIntersection.isChecked,
      above: 0,
      below: 0,
      uptrend: uptrend.isChecked,
      downtrend: downtrend.isChecked,
      isSelected: false,
      notification: "",
    };

    if (signalIntersection.isChecked) {
      macd.isSelected = true;
      macd.notification = "MACD and Signal intersect";
    }

    if (movesAbove.isChecked) {
      macd.above = movesAbove.value;
      macd.isSelected = true;
      macd.notification = `If MACD is above ${movesAbove.value}`;
    }
    if (movesBelow.isChecked) {
      macd.below = movesBelow.value;
      macd.isSelected = true;
      macd.notification = `If MACD is below ${movesBelow.value}`;
    }

    if (uptrend.isChecked) {
      macd.isSelected = true;
      macd.notification = "If MACD is uptrend";
    }
    if (downtrend.isChecked) {
      macd.isSelected = true;
      macd.notification = "If MACD is downtrend";
    }

    updateIndicator("macd", macd);
  }, [
    movesAbove,
    movesBelow,
    uptrend,
    downtrend,
    signalIntersection,
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
          Moving Average Convergence Divergence (MACD)
        </h3>
      </div>
      {open && (
        <div className="mx-5 my-3">
          <div className="mb-3 flex items-center space-x-5">
            <div
              onClick={() => {
                setSignalIntersection({
                  value: "MACD and Signal intersection",
                  isChecked: !signalIntersection.isChecked,
                });
                setMovesAbove({ isChecked: false, value: 0 });
                setMovesBelow({ isChecked: false, value: 0 });
                setUptrend({ isChecked: false, value: "" });
                setDowntrend({ isChecked: false, value: "" });
              }}
              className={
                signalIntersection.isChecked
                  ? "text-center cursor-pointer bg-white h-5 w-5 rounded-full"
                  : "cursor-pointer bg-white h-3 w-3 p-2 rounded-full border border-primary-blue"
              }
            >
              {signalIntersection.isChecked && (
                <CircularTick
                  fill="#002172"
                  className="h-5 w-5 cursor-pointer"
                />
              )}
            </div>
            <p className="text-base font-normal text-primary-blue">
              MACD and Signal intersection
            </p>
          </div>
          <div className="mb-3 flex items-center space-x-5">
            <div
              onClick={() => {
                setMovesAbove({
                  ...movesAbove,
                  isChecked: !movesAbove.isChecked,
                });
                setMovesBelow({ isChecked: false, value: 0 });
                setUptrend({ isChecked: false, value: "" });
                setDowntrend({ isChecked: false, value: "" });
                setSignalIntersection({ isChecked: false, value: "" });
              }}
              className={
                movesAbove.isChecked
                  ? "text-center cursor-pointer bg-white h-5 w-5 rounded-full"
                  : "cursor-pointer bg-white h-3 w-3 p-2 rounded-full border border-primary-blue"
              }
            >
              {movesAbove.isChecked && (
                <CircularTick
                  fill="#002172"
                  className="h-5 w-5 cursor-pointer"
                />
              )}
            </div>
            <p className="text-base font-normal text-primary-blue">
              MACD above
            </p>
            <input
              type="text"
              value={movesAbove.value}
              onChange={(e) =>
                setMovesAbove({ ...movesAbove, value: e.target.value })
              }
              id="adosc-moves-above"
              className="w-20 text-center rounded border border-primary-blue-lt p-1 text-xl font-medium text-primary-blue focus:outline-none"
            />
          </div>
          <div className="mb-3 flex items-center space-x-5">
            <div
              onClick={() => {
                setMovesBelow({
                  ...movesBelow,
                  isChecked: !movesBelow.isChecked,
                });
                setMovesAbove({ isChecked: false, value: 0 });
                setUptrend({ isChecked: false, value: "" });
                setDowntrend({ isChecked: false, value: "" });
                setSignalIntersection({
                  isChecked: false,
                  value: "",
                });
              }}
              className={
                movesBelow.isChecked
                  ? "text-center cursor-pointer bg-white h-5 w-5 rounded-full"
                  : "cursor-pointer bg-white h-3 w-3 p-2 rounded-full border border-primary-blue"
              }
            >
              {movesBelow.isChecked && (
                <CircularTick
                  fill="#002172"
                  className="h-5 w-5 cursor-pointer"
                />
              )}
            </div>
            <p className="text-base font-normal text-primary-blue">
              MACD below
            </p>
            <input
              type="text"
              value={movesBelow.value}
              onChange={(e) =>
                setMovesBelow({ ...movesBelow, value: e.target.value })
              }
              id="adosc-moves-below"
              className="w-20 text-center rounded border border-primary-blue-lt p-1 text-xl font-medium text-primary-blue focus:outline-none"
            />
          </div>

          <div className="mb-3 flex items-center space-x-5">
            <div
              onClick={() => {
                setUptrend({
                  value: "MACD uptrend",
                  isChecked: !uptrend.isChecked,
                });
                setMovesAbove({ isChecked: false, value: 0 });
                setMovesBelow({ isChecked: false, value: 0 });
                setDowntrend({ isChecked: false, value: "" });
                setSignalIntersection({
                  isChecked: false,
                  value: "",
                });
              }}
              className={
                uptrend.isChecked
                  ? "text-center cursor-pointer bg-white h-5 w-5 rounded-full"
                  : "cursor-pointer bg-white h-3 w-3 p-2 rounded-full border border-primary-blue"
              }
            >
              {uptrend.isChecked && (
                <CircularTick
                  fill="#002172"
                  className="h-5 w-5 cursor-pointer"
                />
              )}
            </div>
            <p className="text-base font-normal text-primary-blue">
              MACD uptrend
            </p>
          </div>
          <div className="flex items-center space-x-5">
            <div
              onClick={() => {
                setDowntrend({
                  value: "MACD downtrend",
                  isChecked: !downtrend.isChecked,
                });
                setMovesAbove({ isChecked: false, value: 0 });
                setMovesBelow({ isChecked: false, value: 0 });
                setUptrend({ isChecked: false, value: "" });
                setSignalIntersection({
                  isChecked: false,
                  value: "",
                });
              }}
              className={
                downtrend.isChecked
                  ? "text-center cursor-pointer bg-white h-5 w-5 rounded-full"
                  : "cursor-pointer bg-white h-3 w-3 p-2 rounded-full border border-primary-blue"
              }
            >
              {downtrend.isChecked && (
                <CircularTick
                  fill="#002172"
                  className="h-5 w-5 cursor-pointer"
                />
              )}
            </div>
            <p className="text-base font-normal text-primary-blue">
              MACD downtrend
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovingAverageConvergenceDivergence;
