import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./phone-input.css";

const PhoneInputComponent = ({ value, setValue, getOTPCode }) => {
  return (
    <PhoneInput
      placeholder="Enter the phone number"
      value={value}
      onChange={(value) => setValue(value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          getOTPCode();
        }
      }}
      country={"us"}
    />
  );
};

export default PhoneInputComponent;
