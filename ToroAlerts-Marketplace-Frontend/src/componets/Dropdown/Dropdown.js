import React, { useState } from "react";
import DropdownArrow from "../../assets/SVG/dropdown-arrow";
import { useClickOutside } from "../../CustomHooks/use-click-outside";

const Dropdown = ({ options, currentValue, setCurrentValue }) => {
  const [open, setOpen] = useState(false);

  let domNode = useClickOutside(() => setOpen(false));
  return (
    <div ref={domNode}>
      <div className="w-36 flex items-center justify-between border border-primary-blue-lt px-5 py-2 rounded-lg bg-ternary-blue-ltr-ltr">
        <h3 className="text-xl text-primary-blue-lt font-medium">
          {currentValue.name}
        </h3>
        <div
          onClick={() => setOpen((prevState) => !prevState)}
          className="mt-1 cursor-pointer"
        >
          <DropdownArrow />
        </div>
      </div>
      {open && (
        <ul className="absolute z-40 shadow-md py-5 bg-white w-36">
          {options.map((option) => (
            <li
              className="text-lg px-4 py-2 text-primary-blue hover:font-medium hover:bg-ternary-blue-ltr-ltr cursor-pointer"
              onClick={() => setCurrentValue(option)}
              key={option.id}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
