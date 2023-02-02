import React, { useState } from "react";
import styles from "./subscribe-button.module.css";

const SubscribeButton = ({ onClick, isSubscribed }) => {
  const [isChecked, setIsChecked] = useState(isSubscribed);
  const handleOnChange = () => {
    setIsChecked((prevState) => !prevState);
  };

  return (
    <div
      onClick={onClick}
      className={
        isChecked
          ? "rounded-3xl flex items-center bg-secondary-green py-1.5 px-3"
          : "rounded-3xl flex items-center bg-ternary-blue py-1.5 px-3"
      }
    >
      {isChecked && (
        <p className="text-sm text-white text-normal">SUBSCRIBED</p>
      )}
      <label>
        <input
          checked={isChecked}
          onChange={handleOnChange}
          className={styles.switch}
          type="checkbox"
        />
        <div>
          <div></div>
        </div>
      </label>
      {!isChecked && (
        <p className="text-sm text-white text-normal">SUBSCRIBE</p>
      )}
    </div>
  );
};

export default SubscribeButton;
