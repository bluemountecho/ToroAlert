import React from "react";

const CircularArrowBack = ({ className }) => {
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
        d="M25.286 27.704L15 19.614 24.35 12"
      ></path>
    </svg>
  );
};

export default CircularArrowBack;
