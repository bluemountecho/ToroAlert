import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ReCaptcha = ({ setReCaptchaValidated }) => {
  const recaptchaRef = React.createRef();

  const onSubmit = () => {
    const recaptchaValue = recaptchaRef.current.getValue();
    console.log("recaptchaValue", recaptchaValue);
    onSubmit(recaptchaValue);
  };

  const onChange = (value) => {
    console.log("Captcha value:", value);
    if (value === null) {
      setReCaptchaValidated(false);
    } else {
      setReCaptchaValidated(true);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey="6LfybxcgAAAAAAvMsEGnVuN9gNQr1upNKgAl_ele"
        onChange={onChange}
      />
    </form>
  );
};

export default ReCaptcha;
