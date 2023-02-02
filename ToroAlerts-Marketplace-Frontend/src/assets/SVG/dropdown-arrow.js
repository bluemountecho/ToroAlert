import React from "react";

const DropdownArrow = ({ className, color, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className ? className : "h-5 w-5"}
      fill="none"
      viewBox="0 0 25 15"
      {...rest}
    >
      <path
        fill={color ? color : "#072C9E"}
        d="M12.5 15L24.191 0H.81L12.5 15z"
      ></path>
    </svg>
  );
};

export default DropdownArrow;
