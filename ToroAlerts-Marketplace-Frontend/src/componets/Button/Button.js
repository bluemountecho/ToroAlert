import React from "react";
import CircleSpinner from "../Spinners/CircleSpinner/CircleSpinner";
import CircularTick from "../../assets/SVG/circular-tick";

const Button = ({
  isLoading,
  innerText,
  type,
  onClick,
  onKeyPress,
  disabled,
  extraClass,
  Icon,
  ...rest
}) => {
  return (
    <div className={` ${extraClass}  rounded-lg flex items-center space-x-2 `}>
      {Icon && <CircularTick />}
      <button
        onClick={onClick}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            onClick();
            console.log("Enter");
          }
        }}
        type={type}
        {...rest}
        disabled={disabled ? disabled : isLoading}
        className={`w-full disabled:opacity-80 flex items-center justify-center  space-x-3 py-1.5 xl:py-2 px-7 `}
      >
        <span>{innerText}</span>
        {isLoading && (
          <span>
            <CircleSpinner />
          </span>
        )}
      </button>
    </div>
  );
};

export default Button;
