import React from "react";

const BreadcrumbArrow = ({ className, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className ? className : "h-5 w-5"}
      fill="none"
      viewBox="0 0 43 16"
    >
      <path
        fill={color ? color : "#072C9E"}
        d="M0 0h43l-4.036 2.63a47.158 47.158 0 00-11.119 10.104c-2.638 3.309-7.593 3.516-10.498.439l-3.198-3.386a29.946 29.946 0 00-6.373-5.124L0 0z"
      ></path>
    </svg>
  );
};

export default BreadcrumbArrow;
