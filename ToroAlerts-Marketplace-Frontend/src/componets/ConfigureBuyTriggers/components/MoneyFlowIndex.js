import React, { useEffect, useState } from "react";
import ArrowRight from "../../../assets/SVG/arrow-right";
import CircularTick from "../../../assets/SVG/circular-tick";
import DropdownArrow from "../../../assets/SVG/dropdown-arrow";

const MoneyFlowIndex = ({ updateIndicator }) => {
  const [open, setOpen] = useState(false);
  const [movesAbove, setMovesAbove] = useState({ isChecked: false, value: 0 });
  const [movesBelow, setMovesBelow] = useState({ isChecked: false, value: 0 });

  useEffect(() => {
    const mfi = {
      above: 0,
      below: 0,
      isSelected: false,
      notification: "",
    };

    if (movesAbove.isChecked) {
      mfi.above = movesAbove.value;
      mfi.isSelected = true;
      mfi.notification = `When MFI is above ${movesAbove.value}`;
    }
    if (movesBelow.isChecked) {
      mfi.below = movesBelow.value;
      mfi.isSelected = true;
      mfi.notification = `When MFI is below ${movesBelow.value}`;
    }
    updateIndicator("mfi", mfi);
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
          Money Flow Index (MFI)
        </h3>
      </div>
      <p className="mx-7 mt-1 text-lg font-medium text-primary-blue">
        (Value between 0 and 100)
      </p>
      {open && (
        <div className="mx-5 my-3">
          <div className="mb-3 flex items-center space-x-5">
            <div
              onClick={() => {
                setMovesAbove({
                  ...movesAbove,
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
              When MFI is above a value
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
          <div className="flex items-center space-x-5">
            <div
              onClick={() => {
                setMovesBelow({
                  ...movesBelow,
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
              When MFI is below a value
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
        </div>
      )}
    </div>
  );
};

export default MoneyFlowIndex;
