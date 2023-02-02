import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Background from "../../assets/images/bg-login.png";
import Logo from "../../assets/SVG/logo";
import Button from "../../componets/Button/Button";
import { AuthContext } from "../../Context/auth-context";
import axios from "../../helpers/axios/axios";
import { BASE_URL } from "../../helpers/url/url";

const CryptoLogin = () => {
  const { crypto } = useParams();
  const [apiKey, setApiKey] = useState("");
  const [apiSecretKey, setApiSecretKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const validateApiKeys = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/mirrorTrades/crypto/validateApiKeys`,
        { platform: crypto, clientId: apiKey, clientSecret: apiSecretKey }
      );
      console.log(response.statusText === "OK");
      if (response) {
        auth.apiKeyValidated(true);
        navigate("/marketplace/my-mirror-trades/configured-platform");
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${Background})`,
      }}
      className="max-w-screen min-h-screen bg-primary-blue bg-no-repeat pt-10 pb-20"
    >
      <div className="flex flex-col space-y-10 items-center">
        <div className="flex items-center space-x-4 mb-10">
          <Logo className="w-10 h-12 xl:w-12 xl:h-14" />
          <div className="text-2xl xl:text-3xl font-normal">
            <span className="text-white">Toro</span>
            <span className="text-primary-yellow">Alerts</span>
          </div>
        </div>
        <div className="flex items-center space-x-5">
          <h3 className="text-2xl text-white font-medium">
            Configure my Crypto Account
          </h3>
          <Button
            innerText="Review Pre-requisite"
            type="button"
            extraClass="border border-primary-yellow rounded-md min-w-max text-md xl:text-lg text-primary-yellow bg-transparent hover:bg-primary-yellow hover:text-primary-blue font-medium"
          />
        </div>
        <div className="flex flex-col items-center justify-center space-y-10 w-[45%] rounded-md border-2 border-ternary-blue py-20">
          <p className="text-xl font-normal text-white text-center capitalize">
            {`Crypto Account: ${crypto}`}
          </p>
          <div className="flex flex-col items-center justify-center space-y-10">
            <div>
              <label
                className="mr-20 text-xl text-white font-normal"
                htmlFor="api-key"
              >
                API Key:
              </label>
              <input
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                type="text"
                name="api-key"
                id="api-key"
                className="w-[350px] bg-transparent focus:outline-none px-3 py-1 border border-ternary-blue rounded-md text-white text-lg font-medium"
              />
            </div>
            <div>
              <label
                className="mr-5 text-xl text-white font-normal"
                htmlFor="api-secret-key"
              >
                API Secret Key:
              </label>
              <input
                value={apiSecretKey}
                onChange={(e) => setApiSecretKey(e.target.value)}
                type="text"
                name="api-secret-key"
                id="api-secret-key"
                className="w-[350px] bg-transparent focus:outline-none px-3 py-1 border border-ternary-blue rounded-md text-white text-lg font-medium"
              />
            </div>
            <Button
              isLoading={isLoading}
              disabled={isLoading}
              onClick={validateApiKeys}
              innerText="Extract Transactions"
              type="button"
              extraClass="ml-[9.5rem] w-[350px] text-center text-md xl:text-lg text-primary-blue-lt bg-primary-yellow font-medium"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoLogin;
