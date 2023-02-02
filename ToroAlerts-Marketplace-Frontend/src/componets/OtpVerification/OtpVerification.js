import React from "react";
import OtpInput from "./components/OtpInput";
import parsePhoneNumber from "libphonenumber-js";

const OtpVerification = ({
  phoneNumber,
  otpCode,
  setOtpCode,
  onClick,
  isLoading,
  resendOTPCode,
}) => {
  const parsedPhoneNumber = parsePhoneNumber("+" + phoneNumber);
  const formattedPhoneNumber =
    "+" +
    parsedPhoneNumber.countryCallingCode +
    " " +
    parsedPhoneNumber.nationalNumber;

  return (
    <div className="my-10">
      <p className="text-xl text-white mb-10">
        We have sent the 'One time Password' to your mobile number{" "}
        {phoneNumber ? formattedPhoneNumber : ""}
      </p>
      <OtpInput
        otpCode={otpCode}
        setOtpCode={setOtpCode}
        onClick={onClick}
        isLoading={isLoading}
        resendOTPCode={resendOTPCode}
      />
    </div>
  );
};

export default OtpVerification;
