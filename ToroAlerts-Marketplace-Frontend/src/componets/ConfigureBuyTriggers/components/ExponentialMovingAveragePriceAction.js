import React, { useEffect, useState } from "react";
import ArrowRight from "../../../assets/SVG/arrow-right";
import CircularTick from "../../../assets/SVG/circular-tick";
import DropdownArrow from "../../../assets/SVG/dropdown-arrow";
import ConfigureDropdown from "../../ConfigureDropdown/ConfigureDropdown";

const ExponentialMovingAveragePriceAction = ({ updateIndicator }) => {
  const [open, setOpen] = useState(false);
  const [emaValue, setSmaValue] = useState("nil");
  const [priceMovement, setPriceMovement] = useState({ type: "", value: 0 });
  const [isChecked, setIsChecked] = useState(false);

  const emaValueHandler = (value) => {
    setSmaValue(value);
  };

  const priceMovementHandler = (value) => {
    setPriceMovement({ ...priceMovement, type: value });
  };

  useEffect(() => {
    let emaPM = {
      ema: "nil",
      above: 0,
      below: 0,
      isSelected: false,
      notification: "",
    };

    if (isChecked) {
      emaPM.ema = emaValue;
      emaPM[priceMovement.type] = priceMovement.value;
      emaPM.isSelected = true;
      emaPM.notification = `${emaValue.toUpperCase()} EMA has price movement ${priceMovement.type.toUpperCase()} ${
        priceMovement.value
      }`;
    }

    updateIndicator("emaPM", emaPM);
  }, [
    emaValue,
    priceMovement.value,
    updateIndicator,
    priceMovement.type,
    isChecked,
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
          Exponential Moving Average Price Action (EMAPA)
        </h3>
      </div>
      {open && (
        <div className="mx-5 my-3">
          <div className="mt-10 mb-10 flex items-start space-x-5">
            {/* <p className="text-xl font-medium text-primary-blue-lt">SMA</p> */}
            <div
              onClick={() => {
                setIsChecked((prev) => !prev);
              }}
              className={
                isChecked
                  ? "mt-3 text-center cursor-pointer bg-white h-5 w-5 rounded-full"
                  : "mt-3 cursor-pointer bg-white h-3 w-3 p-2 rounded-full border border-primary-blue"
              }
            >
              {isChecked && (
                <CircularTick
                  fill="#002172"
                  className="h-5 w-5 cursor-pointer"
                />
              )}
            </div>
            <ConfigureDropdown
              options={[
                { id: "high", name: "High Price" },
                { id: "low", name: "Low Price" },
                { id: "close", name: "Close Price" },
              ]}
              heading=""
              setValue={emaValueHandler}
              value={emaValue}
            />
            <p className="text-xl font-medium text-primary-blue-lt">is</p>

            {/* <p className="text-xl font-medium text-primary-blue-lt">
                Price Movement
              </p> */}
            <ConfigureDropdown
              options={[
                { id: "below", name: "Below" },
                { id: "above", name: "Above" },
              ]}
              heading=""
              setValue={priceMovementHandler}
              value={priceMovement.type}
            />
            <input
              type="text"
              id="price-movement"
              className="text-center border-b border-primary-blue w-[60px] focus:outline-none text-lg text-primary-blue"
              value={priceMovement.value}
              onChange={(e) =>
                setPriceMovement({ ...priceMovement, value: e.target.value })
              }
            />

            <p className="text-xl font-medium text-primary-blue-lt">day</p>
            <p className="text-xl font-medium text-primary-blue-lt">EMA</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExponentialMovingAveragePriceAction;
