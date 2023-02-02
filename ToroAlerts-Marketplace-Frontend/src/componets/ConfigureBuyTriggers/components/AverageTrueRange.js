import React, { useEffect, useState } from "react";
import ArrowRight from "../../../assets/SVG/arrow-right";
import CircularTick from "../../../assets/SVG/circular-tick";
import DropdownArrow from "../../../assets/SVG/dropdown-arrow";

const AverageTrueRange = ({ updateIndicator }) => {
  const [open, setOpen] = useState(false);
  const [dropsBelowOne, setDropsBelowOne] = useState({
    value: "",
    isChecked: false,
  });
  const [dropsBelowTwo, setDropsBelowTwo] = useState({
    value: "",
    isChecked: false,
  });
  const [dropsBelowThree, setDropsBelowThree] = useState({
    value: "",
    isChecked: false,
  });

  useEffect(() => {
    const atr = {
      below1x: dropsBelowOne.isChecked,
      below2x: dropsBelowTwo.isChecked,
      below3x: dropsBelowThree.isChecked,
      isSelected: false,
      notification: "",
    };

    if (dropsBelowOne.isChecked) {
      atr.isSelected = true;
      atr.notification = "If price drops below 1x the ATR";
    }
    if (dropsBelowTwo.isChecked) {
      atr.isSelected = true;
      atr.notification = "If price drops below 2x the ATR";
    }
    if (dropsBelowThree.isChecked) {
      atr.isSelected = true;
      atr.notification = "If price drops below 3x the ATR";
    }

    updateIndicator("atr", atr);
  }, [dropsBelowOne, dropsBelowTwo, dropsBelowThree, updateIndicator]);

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
          Average True Range (ATR)
        </h3>
      </div>
      {open && (
        <div className="mx-5 my-3">
          <div className="mb-3 flex items-center space-x-5">
            <div
              onClick={() => {
                setDropsBelowOne({
                  value: "drops below 1x",
                  isChecked: !dropsBelowOne.isChecked,
                });
                setDropsBelowTwo({ isChecked: false, value: "" });
                setDropsBelowThree({ isChecked: false, value: "" });
              }}
              className={
                dropsBelowOne.isChecked
                  ? "text-center cursor-pointer bg-white h-5 w-5 rounded-full"
                  : "cursor-pointer bg-white h-3 w-3 p-2 rounded-full border border-primary-blue"
              }
            >
              {dropsBelowOne.isChecked && (
                <CircularTick
                  fill="#002172"
                  className="h-5 w-5 cursor-pointer"
                />
              )}
            </div>
            <p className="text-base font-normal text-primary-blue">
              Price drops below 1x the ATR
            </p>
          </div>
          <div className="flex items-center space-x-5 mb-3">
            <div
              onClick={() => {
                setDropsBelowTwo({
                  value: "drops below 2x",
                  isChecked: !dropsBelowTwo.isChecked,
                });
                setDropsBelowOne({ isChecked: false, value: "" });
                setDropsBelowThree({ isChecked: false, value: "" });
              }}
              className={
                dropsBelowTwo.isChecked
                  ? "text-center cursor-pointer bg-white h-5 w-5 rounded-full"
                  : "cursor-pointer bg-white h-3 w-3 p-2 rounded-full border border-primary-blue"
              }
            >
              {dropsBelowTwo.isChecked && (
                <CircularTick
                  fill="#002172"
                  className="h-5 w-5 cursor-pointer"
                />
              )}
            </div>
            <p className="text-base font-normal text-primary-blue">
              Price drops below 2x the ATR
            </p>
          </div>

          <div className="flex items-center space-x-5">
            <div
              onClick={() => {
                setDropsBelowThree({
                  value: "drops below 3x",
                  isChecked: !dropsBelowThree.isChecked,
                });
                setDropsBelowOne({ isChecked: false, value: "" });
                setDropsBelowTwo({ isChecked: false, value: "" });
              }}
              className={
                dropsBelowThree.isChecked
                  ? "text-center cursor-pointer bg-white h-5 w-5 rounded-full"
                  : "cursor-pointer bg-white h-3 w-3 p-2 rounded-full border border-primary-blue"
              }
            >
              {dropsBelowThree.isChecked && (
                <CircularTick
                  fill="#002172"
                  className="h-5 w-5 cursor-pointer"
                />
              )}
            </div>
            <p className="text-base font-normal text-primary-blue">
              Price drops below 3x the ATR
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AverageTrueRange;
