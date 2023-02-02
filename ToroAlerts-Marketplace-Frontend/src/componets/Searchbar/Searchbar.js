import React from "react";
import Cancel from "../../assets/SVG/cancel";
import Search from "../../assets/SVG/search";
import CircleSpinner from "../Spinners/CircleSpinner/CircleSpinner";

const Searchbar = ({
  extraClass,
  value,
  onChange,
  clearInput,
  isLoading,
  placeholder,
  onKeyPress,
}) => {
  const onKeyPressHandler = (e) => {
    if (onKeyPress) {
      onKeyPress(e);
    }
  };

  return (
    <div
      className={`px-5 py-2 border border-primary-blue-lt rounded-lg flex items-center justify-between text-xl text-primary-blue ${extraClass}`}
    >
      <div className="flex grow-0 items-center space-x-3">
        <Search />
        <input
          onKeyPress={(e) => onKeyPressHandler(e)}
          onChange={(e) => onChange(e)}
          value={value ? value : ""}
          type="text"
          placeholder={placeholder ? placeholder : "Search"}
          className="focus:outline-none bg-transparent placeholder:text-primary-blue placeholder:text-lg placeholder:font-medium"
        />
      </div>
      {isLoading && <CircleSpinner />}
      {value && !isLoading && (
        <Cancel
          onClick={clearInput}
          className="text-ternary-blue hover:text-primary-blue h-6 w-6 cursor-pointer "
        />
      )}
    </div>
  );
};

export default Searchbar;
