import React from "react";

const BackArrow = ({ className, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className ? className : "h-5 w-5"}
      fill="none"
      viewBox="0 0 36 36"
      {...rest}
    >
      <path
        stroke="#002172"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.7"
        d="M30 18H6M16.5 28.5L6 18 16.5 7.5"
      ></path>
    </svg>
  );
};

export default BackArrow;
