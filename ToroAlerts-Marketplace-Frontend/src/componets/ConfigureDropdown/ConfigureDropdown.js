import React, { useState } from "react";
import DropdownArrow from "../../assets/SVG/dropdown-arrow";

const ConfigureDropdown = ({ options, heading, setValue, value }) => {
  const [open, setOpen] = useState(true);
  const [currentHeading, setCurrentHeading] = useState(heading);

  return (
    <div className="w-[250px]">
      <div className="bg-primary-blue py-3 px-5 flex items-center justify-between">
        <h2 className="text-white text-base font-normal">{currentHeading}</h2>
        <DropdownArrow
          className="cursor-pointer h-5 w-5"
          color="#A4BEFF"
          onClick={() => setOpen((prevState) => setOpen(!prevState))}
        />
      </div>
      {open && (
        <div className="border border-ternary-blue">
          {options.map((option) => (
            <p
              key={option.id}
              onClick={() => {
                setValue(option.id);
                setCurrentHeading(option.name);
              }}
              className={
                value === option.id
                  ? "bg-ternary-blue-ltr-ltr border-t border-ternary-blue-result-bg px-5 py-2 text-base font-normal text-primary-blue-lt"
                  : "bg-white hover:bg-ternary-blue-ltr-ltr border-t border-ternary-blue-result-bg px-5 py-2 text-base font-normal text-primary-blue-lt"
              }
            >
              {option.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConfigureDropdown;
