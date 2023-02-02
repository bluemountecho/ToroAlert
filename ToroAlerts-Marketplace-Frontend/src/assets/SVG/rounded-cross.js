import React from "react";

const RoundedCross = ({ className, fill, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className ? className : "h-5 w-5"}
      fill="none"
      viewBox="0 0 24 24"
      {...rest}
    >
      <path
        fill={fill ? fill : "#072C9E"}
        d="M12 0a12 12 0 1012 12A12.023 12.023 0 0012 0zm3.943 14.343a1.143 1.143 0 01-1.6 1.6L12 13.597l-2.343 2.346a1.143 1.143 0 01-1.6-1.6L10.403 12 8.057 9.657a1.143 1.143 0 011.6-1.6L12 10.403l2.343-2.346a1.143 1.143 0 011.6 1.6L13.597 12l2.346 2.343z"
      ></path>
    </svg>
  );
};

export default RoundedCross;
