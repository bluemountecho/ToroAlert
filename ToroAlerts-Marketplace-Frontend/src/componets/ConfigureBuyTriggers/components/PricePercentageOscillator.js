import React, { useEffect, useState } from "react";
import ArrowRight from "../../../assets/SVG/arrow-right";
import CircularTick from "../../../assets/SVG/circular-tick";
import DropdownArrow from "../../../assets/SVG/dropdown-arrow";

const PricePercentageOscillator = ({ updateIndicator }) => {
  const [open, setOpen] = useState(false);
  const [isAbove, setIsAbove] = useState({ isChecked: false, value: 0 });
  const [isBelow, setIsBelow] = useState({ isChecked: false, value: 0 });
  const [signalIsAbove, setSignalIsAbove] = useState({
    isChecked: false,
    value: 0,
  });
  const [signalIsBelow, setSignalIsBelow] = useState({
    isChecked: false,
    value: 0,
  });
  const [signalIntersection, setSignalIntersection] = useState({
    isChecked: false,
    value: "",
  });

  useEffect(() => {
    const ppo = {
      above: 0,
      below: 0,
      signalAbove: 0,
      signalBelow: 0,
      signalIntersection: signalIntersection.isChecked,
      isSelected: false,
      notification: "",
    };

    if (isAbove.isChecked) {
      ppo.above = isAbove.value;
      ppo.isSelected = true;
      ppo.notification = `If PPO is above ${isAbove.value}`;
    }
    if (isBelow.isChecked) {
      ppo.below = isBelow.value;
      ppo.isSelected = true;
      ppo.notification = `If PPO is below ${isBelow.value}`;
    }
    if (signalIsAbove.isChecked) {
      ppo.signalAbove = signalIsAbove.value;
      ppo.isSelected = true;
      ppo.notification = `If PPO signal is above ${signalIsAbove.value}`;
    }
    if (signalIsBelow.isChecked) {
      ppo.signalBelow = signalIsBelow.value;
      ppo.isSelected = true;
      ppo.notification = `If PPO signal is below ${signalIsBelow.value}`;
    }

    if (signalIntersection.isChecked) {
      ppo.isSelected = true;
      ppo.notification = "PPO and Signal intersect";
    }

    updateIndicator("ppo", ppo);
  }, [
    isAbove,
    isBelow,
    signalIsAbove,
    signalIsBelow,
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
          Percentage Price Oscillator (PPO)
        </h3>
      </div>
      {open && (
        <div className="mx-5 my-3">
          <div className="mb-3 flex items-center space-x-5">
            <div
              onClick={() => {
                setIsAbove({
                  ...isAbove,
                  isChecked: !isAbove.isChecked,
                });
                setIsBelow({ isChecked: false, value: 0 });
                setSignalIsAbove({ isChecked: false, value: 0 });
                setSignalIsBelow({ isChecked: false, value: 0 });
                setSignalIntersection({ isChecked: false, value: "" });
              }}
              className={
                isAbove.isChecked
                  ? "text-center cursor-pointer bg-white h-5 w-5 rounded-full"
                  : "cursor-pointer bg-white h-3 w-3 p-2 rounded-full border border-primary-blue"
              }
            >
              {isAbove.isChecked && (
                <CircularTick
                  fill="#002172"
                  className="h-5 w-5 cursor-pointer"
                />
              )}
            </div>
            <p className="text-base font-normal text-primary-blue">
              PPO is above
            </p>
            <input
              type="text"
              value={isAbove.value}
              onChange={(e) =>
                setIsAbove({ ...isAbove, value: e.target.value })
              }
              id="adosc-moves-above"
              className="w-20 text-center rounded border border-primary-blue-lt p-1 text-xl font-medium text-primary-blue focus:outline-none"
            />
          </div>
          <div className="mb-3 flex items-center space-x-5">
            <div
              onClick={() => {
                setIsBelow({
                  ...isBelow,
                  isChecked: !isBelow.isChecked,
                });
                setIsAbove({ isChecked: false, value: 0 });
                setSignalIsAbove({ isChecked: false, value: 0 });
                setSignalIsBelow({ isChecked: false, value: 0 });
                setSignalIntersection({
                  isChecked: false,
                  value: "",
                });
              }}
              className={
                isBelow.isChecked
                  ? "text-center cursor-pointer bg-white h-5 w-5 rounded-full"
                  : "cursor-pointer bg-white h-3 w-3 p-2 rounded-full border border-primary-blue"
              }
            >
              {isBelow.isChecked && (
                <CircularTick
                  fill="#002172"
                  className="h-5 w-5 cursor-pointer"
                />
              )}
            </div>
            <p className="text-base font-normal text-primary-blue">
              PPO is below
            </p>
            <input
              type="text"
              value={isBelow.value}
              onChange={(e) =>
                setIsBelow({ ...isBelow, value: e.target.value })
              }
              id="adosc-moves-below"
              className="w-20 text-center rounded border border-primary-blue-lt p-1 text-xl font-medium text-primary-blue focus:outline-none"
            />
          </div>
          <div className="mb-3 flex items-center space-x-5">
            <div
              onClick={() => {
                setSignalIsAbove({
                  ...signalIsAbove,
                  isChecked: !signalIsAbove.isChecked,
                });
                setIsAbove({ isChecked: false, value: 0 });
                setIsBelow({ isChecked: false, value: 0 });
                setSignalIsBelow({ isChecked: false, value: 0 });
                setSignalIntersection({
                  isChecked: false,
                  value: "",
                });
              }}
              className={
                signalIsAbove.isChecked
                  ? "text-center cursor-pointer bg-white h-5 w-5 rounded-full"
                  : "cursor-pointer bg-white h-3 w-3 p-2 rounded-full border border-primary-blue"
              }
            >
              {signalIsAbove.isChecked && (
                <CircularTick
                  fill="#002172"
                  className="h-5 w-5 cursor-pointer"
                />
              )}
            </div>
            <p className="text-base font-normal text-primary-blue">
              PPO signal is above
            </p>
            <input
              type="text"
              value={signalIsAbove.value}
              onChange={(e) =>
                setSignalIsAbove({ ...signalIsAbove, value: e.target.value })
              }
              id="adosc-moves-below"
              className="w-20 text-center rounded border border-primary-blue-lt p-1 text-xl font-medium text-primary-blue focus:outline-none"
            />
          </div>
          <div className="mb-3 flex items-center space-x-5">
            <div
              onClick={() => {
                setSignalIsBelow({
                  ...signalIsBelow,
                  isChecked: !signalIsBelow.isChecked,
                });
                setIsAbove({ isChecked: false, value: 0 });
                setIsBelow({ isChecked: false, value: 0 });
                setSignalIsAbove({ isChecked: false, value: 0 });
                setSignalIntersection({
                  isChecked: false,
                  value: "",
                });
              }}
              className={
                signalIsBelow.isChecked
                  ? "text-center cursor-pointer bg-white h-5 w-5 rounded-full"
                  : "cursor-pointer bg-white h-3 w-3 p-2 rounded-full border border-primary-blue"
              }
            >
              {signalIsBelow.isChecked && (
                <CircularTick
                  fill="#002172"
                  className="h-5 w-5 cursor-pointer"
                />
              )}
            </div>
            <p className="text-base font-normal text-primary-blue">
              PPO signal is below
            </p>
            <input
              type="text"
              value={signalIsBelow.value}
              onChange={(e) =>
                setSignalIsBelow({ ...signalIsBelow, value: e.target.value })
              }
              id="adosc-moves-below"
              className="w-20 text-center rounded border border-primary-blue-lt p-1 text-xl font-medium text-primary-blue focus:outline-none"
            />
          </div>
          <div className="mb-3 flex items-center space-x-5">
            <div
              onClick={() => {
                setSignalIntersection({
                  value: "PPO and signal intersection",
                  isChecked: !signalIntersection.isChecked,
                });
                setIsAbove({ isChecked: false, value: 0 });
                setIsBelow({ isChecked: false, value: 0 });
                setSignalIsAbove({ isChecked: false, value: 0 });
                setSignalIsBelow({ isChecked: false, value: 0 });
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
              PPO and signal intersection
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricePercentageOscillator;
