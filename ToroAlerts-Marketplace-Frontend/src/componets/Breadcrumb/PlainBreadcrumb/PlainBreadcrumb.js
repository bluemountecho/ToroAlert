import React from "react";

const PlainBreadcrumb = ({
  breadcrumbLabels,
  currentLabel,
  setCurrentLabel,
}) => {
  return (
    <div className="w-[56%]">
      <div className="w-full bg-ternary-blue-breadcrumb h-[2px]"></div>
      <div className="flex w-full justify-between">
        {breadcrumbLabels.map((label) => (
          <div key={label.id} className="w-full text-center">
            <div
              className={
                currentLabel === label.id
                  ? "bg-primary-blue h-[2px] -mt-0.5"
                  : "bg-ternary-blue-breadcrumb h-[0px]"
              }
            ></div>
            <h3
              onClick={() => setCurrentLabel(label.id)}
              className={
                currentLabel === label.id
                  ? "cursor-pointer mt-5 text-xl text-primary-blue font-normal"
                  : "cursor-pointer mt-5 text-xl text-secondary-blue font-normal"
              }
            >
              {label.label}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlainBreadcrumb;
