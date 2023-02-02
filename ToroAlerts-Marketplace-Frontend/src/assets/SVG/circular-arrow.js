import React from "react";

const CircularArrow = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className ? className : "h-5 w-5"}
      fill="none"
      viewBox="0 0 40 40"
    >
      <circle cx="20" cy="20" r="20" fill="#A4BEFF"></circle>
      <path
        stroke="#002172"
        strokeLinecap="round"
        strokeWidth="2"
        d="M16 12.214l10.286 8.09-9.35 7.614"
      ></path>
    </svg>
  );
};

export default CircularArrow;
