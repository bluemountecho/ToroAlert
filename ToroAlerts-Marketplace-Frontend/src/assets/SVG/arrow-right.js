import React from "react";

const ArrowRight = ({ className, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className ? className : "h-5 w-5"}
      fill="none"
      viewBox="0 0 16 23"
      {...rest}
    >
      <path fill="#072C9E" d="M16 11.5L.25 22.325V.675L16 11.5z"></path>
    </svg>
  );
};

export default ArrowRight;
