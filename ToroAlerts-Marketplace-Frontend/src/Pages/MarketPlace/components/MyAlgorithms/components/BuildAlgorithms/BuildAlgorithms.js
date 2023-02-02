import React from "react";
import { useNavigate } from "react-router-dom";
import Background from "../../../../../../assets/images/bg-add-algorithm.png";
import Button from "../../../../../../componets/Button/Button";

const ActiveAlgorithms = ({ count, setCount }) => {
  const navigate = useNavigate();
  //console.log(count, "count");

  return (
    <div
      style={{
        backgroundImage: `url(${Background})`,
      }}
      className="bg-no-repeat bg-primary-blue w-full h-[415px] rounded-xl mt-10 text-center flex flex-col items-center"
    >
      <h1 className="text-4xl text-white font-medium mt-10">My Algorithms</h1>
      <p className="text-lg text-white font-normal mt-5 mb-20">
        Design your own Algorithms with our roubust trading tools
      </p>
      <Button
        onClick={() => {
          setCount(undefined);
          navigate("/marketplace/build-my-algorithm");
        }}
        innerText="Build my Algorithm"
        type="button"
        extraClass="text-md xl:text-lg text-primary-blue-lt bg-primary-yellow font-medium"
      />
    </div>
  );
};

export default ActiveAlgorithms;
