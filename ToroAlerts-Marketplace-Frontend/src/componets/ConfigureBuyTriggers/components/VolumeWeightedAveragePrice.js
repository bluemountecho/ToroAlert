import React, { useEffect, useState } from "react";
import ArrowRight from "../../../assets/SVG/arrow-right";
import CircularTick from "../../../assets/SVG/circular-tick";
import DropdownArrow from "../../../assets/SVG/dropdown-arrow";
import ConfigureDropdown from "../../ConfigureDropdown/ConfigureDropdown";

const VolumeWeightedAveragePrice = ({ updateIndicator }) => {
  const [open, setOpen] = useState(false);
  const [priceType, setPriceType] = useState("");
  const [rangeType, setRangeType] = useState("");
  const [noOfDays, setNoOfDays] = useState(0);
  const [vwapOf, setVwapOf] = useState();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    let vwap = {
      type: "nil",
      daysAbove: 0,
      daysBelow: 0,
      vwapOf: "nil",
      isSelected: false,
      notification: "",
    };

    if (isChecked) {
      vwap.type = priceType;
      vwap.isSelected = true;
      if (rangeType === "above") {
        vwap.daysAbove = noOfDays;
      } else if (rangeType === "below") {
        vwap.daysBelow = noOfDays;
      }
      vwap.vwapOf = vwapOf;

      vwap.notification = `${priceType[0]?.toUpperCase()}${priceType?.slice(
        1
      )} is ${rangeType} ${noOfDays} days VWAP of ${vwapOf}`;
    }

    updateIndicator("vwap", vwap);
  }, [updateIndicator, isChecked, priceType, rangeType, vwapOf, noOfDays]);

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
          Volume Weighted Average Price (VWAP)
        </h3>
      </div>
      {open && (
        <div className="mx-5 my-3">
          <div className="flex items-start space-x-5">
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
              heading=""
              options={[
                { id: "high", name: "High Price" },
                { id: "low", name: "Low Price" },
                { id: "close", name: "Close Price" },
              ]}
              setValue={(value) => setPriceType(value)}
              value={priceType.value}
            />
            <p className="mb-2 text-base font-normal text-primary-blue">is</p>
            <ConfigureDropdown
              heading=""
              options={[
                { id: "above", name: "Above" },
                { id: "below", name: "Below" },
              ]}
              value={rangeType}
              setValue={(value) => setRangeType(value)}
            />
            <input
              type="text"
              id="price-movement"
              value={noOfDays}
              onChange={(e) => setNoOfDays(e.target.value)}
              className="text-center border-b border-primary-blue w-[80px] focus:outline-none text-lg text-primary-blue"
            />
            <p className="mb-2 text-base font-normal text-primary-blue">days</p>
            <p className="mb-2 text-base font-normal text-primary-blue">VWAP</p>
            <p className="mb-2 text-base font-normal text-primary-blue">of</p>
            <ConfigureDropdown
              heading=""
              options={[
                { id: "high", name: "High Price" },
                { id: "low", name: "Low Price" },
                { id: "close", name: "Close Price" },
                { id: "(low+high+close)/3", name: "HLC/3" },
                { id: "(low+high+close+open)/4", name: "HLCO/4" },
              ]}
              value={vwapOf}
              setValue={(value) => setVwapOf(value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VolumeWeightedAveragePrice;
