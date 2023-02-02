import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BreadcrumbArrow from "../../../assets/SVG/breadcrumb-arrow";

const PointerBreadcrumb = ({ breadcrumbLabels }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <div className="w-full h-[2px] bg-ternary-blue-breadcrumb -mb-0.5"></div>
      <div className="flex items-center space-x-20 xl:space-x-32">
        {breadcrumbLabels.map((label) => (
          <div key={label.url} className="flex flex-col items-center space-y-3">
            <BreadcrumbArrow
              className="w-11 h-5"
              color={location.pathname === label.url ? "#072C9E" : "FFFFFF"}
            />
            <span
              onClick={() => {
                navigate(label.url);
              }}
              className={
                location.pathname === label.url
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

export default PointerBreadcrumb;
