import React, { useContext, useState } from "react";
import Logo from "../../assets/SVG/logo";
import Button from "../../componets/Button/Button";
import PhoneInputComponent from "../../componets/PhoneInputComponent/PhoneInputComponent";
import OtpVerification from "../../componets/OtpVerification/OtpVerification";
import Background from "../../assets/images/bg-login.png";
import axios from "../../helpers/axios/axios";
import { AuthContext } from "../../Context/auth-context";
import { useNavigate } from "react-router-dom";
import { BASE_URL_AUTH } from "../../helpers/url/url";
import ReCaptcha from "../../componets/ReCaptcha/ReCaptcha";

const Login = () => {
  const [otpCode, setOtpCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [receivedOTP, setReceivedOTP] = useState(false);
  const [isLoading, setIsLoading] = useState({ id: "", loading: false });
  const [reCaptchaValidated, setReCaptchaValidated] = useState(true);//false

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const getOTPCode = async () => {
    if (reCaptchaValidated) {
      setIsLoading({ id: "get-otp-code", loading: true });
      try {
        const response = await axios.post(`${BASE_URL_AUTH}/api/users/signin`, {
          isAdvisor: false,
          phone: phoneNumber,
        });
        //console.log(response);
        setIsLoading({ id: "", loading: false });
        if (response.statusText === "OK") {
          setReceivedOTP(true);
        }
      } catch (err) {
        //console.error(err);
        setIsLoading({ id: "", loading: false });
      }
    }
  };

  const verifyOTPCode = async () => {
    setIsLoading({ id: "verify-otp-code", loading: true });
    try {
      const response = await axios.post(
        `${BASE_URL_AUTH}/api/users/confirmPhone`,
        {
          verifyType: 0,
          verifyCode: otpCode,
          isAdvisor: false,
          phone: phoneNumber,
        }
      );
      setIsLoading({ id: "", loading: false });
      if (response) {
        auth.login("", response.data.token);
      }
      navigate("/");
      //console.log(response);
    } catch (err) {
      //console.error(err);
      setIsLoading({ id: "", loading: false });
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${Background})`,
      }}
      className="max-w-screen min-h-screen bg-primary-blue bg-no-repeat"
    >
      <div className="flex flex-col space-y-20 items-center">
        <div className="flex items-center space-x-4 mt-10">
          <Logo className="w-10 h-12 xl:w-12 xl:h-14" />
          <div className="text-2xl xl:text-3xl font-normal">
            <span className="text-white">Toro</span>
            <span className="text-primary-yellow">Alerts</span>
          </div>
        </div>
        <h1 className="text-5xl text-white font-semibold">
          Get started with your session
        </h1>
        <div className=" py-10 px-16 border-4 border-ternary-blue rounded-xl">
          <h3 className="text-2xl text-white font-medium mb-5">
            Your Phone number
          </h3>
          <div className="flex items-center space-x-20 mb-5">
            <PhoneInputComponent
              value={phoneNumber}
              setValue={setPhoneNumber}
              getOTPCode={getOTPCode}
            />
            <Button
              isLoading={
                isLoading.id === "get-otp-code" ? isLoading.loading : false
              }
              disabled={isLoading.loading || phoneNumber === null}
              onClick={getOTPCode}
              onKeyPress={getOTPCode}
              innerText="Get OTP code"
              type="button"
              extraClass="min-w-max text-md xl:text-lg text-primary-blue-lt bg-primary-yellow font-medium"
            />
          </div>
          <ReCaptcha setReCaptchaValidated={setReCaptchaValidated} />
          {receivedOTP && (
            <div className="mt-5">
              <OtpVerification
                resendOTPCode={getOTPCode}
                phoneNumber={phoneNumber}
                otpCode={otpCode}
                setOtpCode={setOtpCode}
                onClick={verifyOTPCode}
                isLoading={
                  isLoading.id === "verify-otp-code" ? isLoading.loading : false
                }
              />           
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
