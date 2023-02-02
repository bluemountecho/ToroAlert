import React, { useState } from "react";
import RoundedCross from "../../../../assets/SVG/rounded-cross";
import Button from "../../../Button/Button";
import classes from "./asset-allocation.module.css";

const AssetAllocation = ({ onCloseModal, selectedValue, setSelectedValue }) => {
  const initalAllocatedPercent = selectedValue.reduce(function (prev, curr) {
    return prev + parseInt(curr.percentage);
  }, 0);

  const [value, setValue] = useState([...selectedValue]);
  const [error, setError] = useState("");
  const [cashAvailable, setCashAvailable] = useState(
    100 - initalAllocatedPercent
  );

  const handleAssetAllocation = (percent, index) => {
    setValue([
      ...value.map((stock, idx) =>
        idx === index ? { ...stock, percentage: percent } : stock
      ),
    ]);
  };

  const checkPercentageAllowed = (inputVal, index) => {
    let TOTAL_PERCENTAGE = value.reduce(function (prev, curr) {
      if (curr === "") {
        return prev + parseInt(1);
      } else {
        return prev + parseInt(curr.percentage);
      }
    }, 0);

    if (inputVal <= 0 || inputVal === null || inputVal === "") {
      setValue([
        ...value.map((stock, idx) =>
          idx === index ? { ...stock, percentage: 1 } : stock
        ),
      ]);
      TOTAL_PERCENTAGE++;
    }
    setCashAvailable(100 - TOTAL_PERCENTAGE);

    //console.log("TOTAL_PERCENTAGE", TOTAL_PERCENTAGE);
    if (TOTAL_PERCENTAGE > 100) {
      setError("Total stocks percentage should be less than or equal to 100");
      return false;
    }
    setError("");
    return true;
  };

  const saveAssetsHandler = () => {
    if (!error) {
      setSelectedValue([...value]);
    }
    onCloseModal();
  };

  return (
    <div className={`${classes.modalWrapper}`}>
      <div className={classes.modal}>
        <div className="relative flex items-center justify-center mb-5 bg-primary-blue py-6 rounded-t-md">
          <h1 className="text-white text-xl font-semibold">
            You can change the allocation as per your choice
          </h1>

          <div
            className="absolute right-5 cursor-pointer"
            onClick={onCloseModal}
          >
            <RoundedCross fill="#ffffff" className="h-5 w-5 cursor-pointer" />
          </div>
        </div>

        <div className="px-28 py-10 text-xl font-normal text-primary-blue">
          {error && (
            <p className="text-center text-sm text-red-500 mb-5">{error}</p>
          )}
          <div className="grid grid-cols-2 text-center">
            <span className="border border-primary-blue-ltr py-3">Stocks</span>
            <span className="border-t border-b border-r border-primary-blue-ltr py-3">
              Allocation (%)
            </span>
            <span className="border border-primary-blue-ltr py-3">Cash</span>
            <span className="border-t border-b border-r border-primary-blue-ltr py-3">
              {cashAvailable}
            </span>
          </div>
          {selectedValue.map((ticker, index) => {
            return (
              <div
                key={index}
                className="grid grid-cols-2 text-center hover:bg-ternary-blue cursor-pointer"
              >
                <span className="border-b border-l border-r border-primary-blue-ltr py-3">
                  {ticker.name}
                </span>
                <span className="border-b border-r border-primary-blue-ltr py-3">
                  <input
                    value={value[index].percentage}
                    onChange={(e) => {
                      handleAssetAllocation(e.target.value, index);
                    }}
                    onBlur={(e) =>
                      checkPercentageAllowed(e.target.value, index)
                    }
                    type="number"
                    id="share-percentage"
                    className="w-12 text-center focus:outline-none bg-transparent border-b-2 border-ternary-blue"
                  />
                </span>
              </div>
            );
          })}
          <Button
            onClick={saveAssetsHandler}
            innerText="Save"
            type="button"
            extraClass="mt-10 mx-auto max-w-max text-md xl:text-lg text-primary-blue-lt bg-primary-yellow font-medium"
          />
        </div>
      </div>
    </div>
  );
};

export default AssetAllocation;
