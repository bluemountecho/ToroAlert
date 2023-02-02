import React from "react";

const CircularTick = ({ className, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className ? className : "h-5 w-5"}
      fill="none"
      viewBox="0 0 24 24"
      {...rest}
    >
      <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zM9.601 17.296L5.146 12.85l1.694-1.7 2.759 2.754 6.353-6.352 1.696 1.696-8.047 8.048z"></path>
    </svg>
  );
};

export default CircularTick;
