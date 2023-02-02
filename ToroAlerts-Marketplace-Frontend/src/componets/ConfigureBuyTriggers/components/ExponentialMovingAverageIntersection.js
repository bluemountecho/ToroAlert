import React, { useEffect, useState } from "react";
import ArrowRight from "../../../assets/SVG/arrow-right";
import CircularTick from "../../../assets/SVG/circular-tick";
import DropdownArrow from "../../../assets/SVG/dropdown-arrow";
import ConfigureDropdown from "../../ConfigureDropdown/ConfigureDropdown";

const ExponentialMovingAverageIntersection = ({ updateIndicator }) => {
  const [open, setOpen] = useState(false);
  //const [emaValue, setEmaValue] = useState("nil");
  //const [priceMovement, setPriceMovement] = useState({ type: "", value: 0 });
  const [intersection, setIntersection] = useState({
    isChecked: false,
    condition: "nil",
    intersection1: 0,
    intersection2: 0,
  });

  useEffect(() => {
    // let emaPM = {
    //   ema: "nil",
    //   above: 0,
    //   below: 0,
    // };
    let emaI = {
      intersection1: 0,
      condition: "nil",
      intersection2: 0,
      isSelected: false,
      notification: "",
    };

    // emaPM.ema = emaValue;
    // emaPM[priceMovement.type] = priceMovement.value;

    if (intersection.isChecked) {
      emaI = {
        intersection1: intersection.intersection1,
        condition: intersection.condition,
        intersection2: intersection.intersection2,
        isSelected: true,
        notification: `EMA intersection one ${intersection.condition} than intersection two`,
      };
    }

    // updateIndicator("emaPM", emaPM);
    updateIndicator("emaI", emaI);
  }, [
    intersection.isChecked,
    intersection.condition,
    intersection.intersection1,
    intersection.intersection2,
    updateIndicator,
  ]);

  // const emaValueHandler = (value) => {
  //   setEmaValue(value);
  // };

  // const priceMovementHandler = (value) => {
  //   setPriceMovement({ ...priceMovement, type: value });
  // };

  const intersectionHandler = (value) => {
    setIntersection({ ...intersection, condition: value });
  };

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
          Exponential Moving Average Intersection (EMAI)
        </h3>
      </div>
      {open && (
        <div className="mx-5 my-3">
          {/* <div className="mb-10 flex items-center space-x-10">
            <div className="flex items-center space-x-5">
              <p className="text-xl font-medium text-primary-blue-lt">EMA</p>
              <ConfigureDropdown
                options={[
                  { id: "high", name: "High" },
                  { id: "low", name: "Low" },
                  { id: "close", name: "Close" },
                ]}
                heading="EMA"
                setValue={emaValueHandler}
              />
            </div>
            <div className="flex items-center space-x-5">
               <p className="text-xl font-medium text-primary-blue-lt">
                Price Movement
              </p> 
              <ConfigureDropdown
                options={[
                  { id: "below", name: "Below" },
                  { id: "above", name: "Above" },
                ]}
                heading="Price Movement"
                setValue={priceMovementHandler}
              />
              <input
                type="text"
                id="price-movement"
                className="border-b border-primary-blue w-[80px] focus:outline-none text-lg text-primary-blue"
                value={priceMovement.value}
                onChange={(e) =>
                  setPriceMovement({ ...priceMovement, value: e.target.value })
                }
              />
            </div>
          </div> */}

          <div>
            {/* <p className="mb-3 text-xl font-medium text-primary-blue-lt">
              EMA Intersection
            </p> */}
            <div className="mt-10 flex items-center space-x-5">
              <div
                onClick={() => {
                  setIntersection({
                    ...intersection,
                    isChecked: !intersection.isChecked,
                  });
                }}
                className={
                  intersection.isChecked
                    ? "text-center cursor-pointer bg-white h-5 w-5 rounded-full"
                    : "cursor-pointer bg-white h-3 w-3 p-2 rounded-full border border-primary-blue"
                }
              >
                {intersection.isChecked && (
                  <CircularTick
                    fill="#002172"
                    className="h-5 w-5 cursor-pointer"
                  />
                )}
              </div>
              <p className="text-xl font-medium text-primary-blue-lt">EMA</p>
              <input
                type="text"
                className="text-center border-b border-primary-blue w-[80px] focus:outline-none text-lg text-primary-blue"
                value={intersection.intersection1}
                onChange={(e) =>
                  setIntersection({
                    ...intersection,
                    intersection1: e.target.value,
                  })
                }
              />
              <ConfigureDropdown
                options={[
                  { id: "greater", name: "Greater than (>)" },
                  { id: "lesser", name: "Less than (<)" },
                ]}
                setValue={intersectionHandler}
                value={intersection.condition}
                heading="Relation"
              />
              <p className="text-xl font-medium text-primary-blue-lt">EMA</p>
              <input
                type="text"
                className="text-center border-b border-primary-blue w-[80px] focus:outline-none text-lg text-primary-blue"
                value={intersection.intersection2}
                onChange={(e) =>
                  setIntersection({
                    ...intersection,
                    intersection2: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExponentialMovingAverageIntersection;
