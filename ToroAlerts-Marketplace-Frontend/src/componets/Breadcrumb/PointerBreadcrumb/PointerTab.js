import React from "react";
import BreadcrumbArrow from "../../../assets/SVG/breadcrumb-arrow";

const PointerTab = ({ tabLabels, selTabLabel, onClickTab }) => {

  return (
    <div>
      <div className="w-full h-[2px] bg-ternary-blue-breadcrumb -mb-0.5"></div>
      <div className="flex items-center space-x-20 xl:space-x-32">
        {tabLabels.map((label) => (
          <div key={label.label} className="flex flex-col items-center space-y-3">
            <BreadcrumbArrow
              className="w-11 h-5"
              color={selTabLabel === label.label ? "#072C9E" : "FFFFFF"}
            />
            <span
              onClick={() => {
                onClickTab(label.label);
              }}
              className={
                selTabLabel === label.label
                  ? "text-xl xl:text-2xl text-primary-blue font-medium cursor-pointer"
                  : "text-lg xl:text-xl text-secondary-blue font-normal cursor-pointer"
              }
            >
              {label.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PointerTab;
