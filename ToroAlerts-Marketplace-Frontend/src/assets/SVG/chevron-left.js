import React from "react";

const ChevronLeft = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className ? className : "h-5 w-5"}
      fill="none"
      viewBox="0 0 15 22"
    >
      <path
        stroke="#072C9E"
        strokeLinecap="round"
        strokeWidth="1.833"
        d="M14 21L2 11 14 1"
      ></path>
    </svg>
  );
};

export default ChevronLeft;
