import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../../assets/images/bg-login.png";
import Bitcoin from "../../assets/SVG/bitcoin";
import Dollar from "../../assets/SVG/dollar";
import Logo from "../../assets/SVG/logo";
import { AuthContext } from "../../Context/auth-context";

const Home = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useEffect(() => {
    auth.dealingIn(null);
  }, [auth]);

  return (
    <div
      style={{
        backgroundImage: `url(${Background})`,
      }}
      className="max-w-screen min-h-screen bg-primary-blue bg-no-repeat pt-10 pb-20"
    >
      <div className="flex flex-col space-y-16 items-center">
        <div className="flex items-center space-x-4">
          <Logo className="w-10 h-12 xl:w-12 xl:h-14" />
          <div className="text-2xl xl:text-3xl font-normal">
            <span className="text-white">Toro</span>
            <span className="text-primary-yellow">Alerts</span>
          </div>
        </div>
        <div className="flex items-center space-x-20 ">
          <div
            onClick={() => {
              auth.dealingIn("crypto");
              navigate("/marketplace/my-mirror-trades/configured-platform");
            }}
            className="cursor-pointer flex flex-col items-center justify-center space-y-7 w-[450px] h-[500px] bg-primary-blue-ltr-ltr rounded-xl"
          >
            <Bitcoin />
            <h1 className="text-3xl font-semibold text-white">Crypto</h1>
          </div>

          <div
            onClick={() => {
              navigate("/marketplace/my-algorithms/build-algorithms");
              auth.dealingIn("stocks");
            }}
            className="cursor-pointer flex flex-col items-center justify-center space-y-7 w-[450px] h-[500px] border border-ternary-blue bg-ternary-blue-lt-lt rounded-xl"
          >
            <Dollar />
            <h1 className="text-3xl font-semibold text-white">Stock</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
