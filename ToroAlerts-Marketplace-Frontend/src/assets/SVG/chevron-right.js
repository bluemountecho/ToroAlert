import React from "react";

const ChevronRight = ({ className }) => {
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
        d="M1 21l12-10L1 1"
      ></path>
    </svg>
  );
};

export default ChevronRight;
