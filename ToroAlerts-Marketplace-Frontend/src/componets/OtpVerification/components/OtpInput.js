import React from "react";
import Button from "../../Button/Button";
import OtpInput from "react-otp-input";

const OtpInputComponent = ({
  otpCode,
  setOtpCode,
  onClick,
  isLoading,
  resendOTPCode,
}) => {
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      onClick();
    }
  };

  const handleChange = (otp) => setOtpCode(otp);

  return (
    <div className="flex items-center">
      <form className="flex items-center" onSubmit={handleOtpSubmit}>
        <OtpInput
          value={otpCode}
          onChange={handleChange}
          numInputs={6}
          shouldAutoFocus={true}
          inputStyle="text-white border-b-2 border-white mr-5 w-8 text-center bg-transparent  text-xl"
          focusStyle="focus:outline-none"
        />
        <Button
          isLoading={isLoading}
          onClick={onClick}
          innerText="Verify OTP"
          type="submit"
          extraClass="min-w-max text-md xl:text-lg text-primary-blue-lt bg-primary-yellow font-medium"
        />
      </form>

      <p
        onClick={resendOTPCode}
        className="cursor-pointer hover:text-white text-xl text-primary-yellow font-normal self-end mt-4 ml-5"
      >
        Resend Now
      </p>
    </div>
  );
};

export default OtpInputComponent;
