import React, { useEffect, useState } from "react";
import ArrowRight from "../../../assets/SVG/arrow-right";
import CircularTick from "../../../assets/SVG/circular-tick";
import DropdownArrow from "../../../assets/SVG/dropdown-arrow";

const OnBalanceVolume = ({ updateIndicator }) => {
  const [open, setOpen] = useState(false);
  const [movesAbove, setMovesAbove] = useState({ isChecked: false, value: 0 });
  const [movesBelow, setMovesBelow] = useState({ isChecked: false, value: 0 });

  useEffect(() => {
    const obv = {
      upwards: movesAbove.isChecked,
      downwards: movesBelow.isChecked,
      isSelected: false,
      notification: "",
    };

    if (movesAbove.isChecked) {
      obv.isSelected = true;
      obv.notification = "OBV is trending upwards";
    }

    if (movesBelow.isChecked) {
      obv.isSelected = true;
      obv.notification = "OBV is trending downwards";
    }

    updateIndicator("obv", obv);
  }, [movesAbove, movesBelow, updateIndicator]);

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
          On Balance Volume (OBV)
        </h3>
      </div>
      {open && (
        <div className="mx-5 my-3">
          <div className="mb-3 flex items-center space-x-5">
            <div
              onClick={() => {
                setMovesBelow({
                  value: "OBV trending upwards",
                  isChecked: !movesBelow.isChecked,
                });
                setMovesAbove({ isChecked: false, value: 0 });
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
              OBV Trending downwards
            </p>
          </div>
          <div className="flex items-center space-x-5">
            <div
              onClick={() => {
                setMovesAbove({
                  value: "OBV trending upwards",
                  isChecked: !movesAbove.isChecked,
                });
                setMovesBelow({ isChecked: false, value: 0 });
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
              OBV Trending upwards
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnBalanceVolume;
