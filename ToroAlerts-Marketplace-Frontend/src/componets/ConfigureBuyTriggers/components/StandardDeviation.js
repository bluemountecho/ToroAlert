import React, { useEffect, useState } from "react";
import ArrowRight from "../../../assets/SVG/arrow-right";
import CircularTick from "../../../assets/SVG/circular-tick";
import DropdownArrow from "../../../assets/SVG/dropdown-arrow";
import ConfigureDropdown from "../../ConfigureDropdown/ConfigureDropdown";

const StandardDeviation = ({ updateIndicator }) => {
  const [open, setOpen] = useState(false);
  const [days, setDays] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    let stddev = {
      days: 0,
      isSelected: false,
      notification: "",
    };

    if (isChecked) {
      stddev.days = days;
      stddev.isSelected = true;
      stddev.notification = `STDDEV in ${days}`;
    }

    updateIndicator("stddev", stddev);
  }, [days, updateIndicator, isChecked]);

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
          Standard Deviation (STDDEV)
        </h3>
      </div>
      {open && (
        <div className="mx-5 my-3">
          <div className="mt-10 flex items-start space-x-5">
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
                { name: "10 Days", id: 10 },
                { name: "20 Days", id: 20 },
                { name: "21 Days", id: 21 },
                { name: "50 Days", id: 50 },
              ]}
              setValue={setDays}
              value={days}
              heading="Select Days"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StandardDeviation;
