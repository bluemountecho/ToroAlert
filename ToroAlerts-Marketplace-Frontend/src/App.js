import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./componets/Navbar/Navbar";
import Pricing from "./Pages/Pricing/Pricing";
import AboutUs from "./Pages/AboutUs/AboutUs";
import ContactUs from "./Pages/ContactUs/ContactUs";
import Login from "./Pages/Login/Login";
import BuildMyAlgorithm from "./componets/BuildMyAlgorithm/BuildMyAlgorithm";
import AlgorithmDetails from "./componets/AlgorithmDetails/AlgorithmDetails";
import ConfigureBuyTriggers from "./componets/ConfigureBuyTriggers/ConfigureBuyTriggers";
import { useAuth } from "./CustomHooks/auth-hook";
import { AuthContext } from "./Context/auth-context";
import ProtectedRoute from "./helpers/protected-routes/protected-routes";
import MarketPlace from "./Pages/MarketPlace/MarketPlace";
import ConfigureSellTriggers from "./componets/ConfigureBuyTriggers/ConfigureSellTriggers";
import LoadingSpinner from "./componets/Spinners/LoadingSpinner/LoadingSpinner";
import Home from "./Pages/Home/Home";
import CryptoLogin from "./Pages/Login/CryptoLogin";
import CryptoMarketplace from "./Pages/MarketPlace/CryptoMarketPlace/CryptoMarketPlace";
import MirrorCryptoTrades from "./componets/MirrorCryptoTrades/MirrorCryptoTrades";
import ReCaptcha from "./componets/ReCaptcha/ReCaptcha";

const App = () => {
  //const auth = useContext(AuthContext);
  //console.log("auth", auth);
  //const count = useRef();

  const {
    token,
    login,
    logout,
    user,
    dealingIn,
    dealsIn,
    apiKeyValidated,
    isApiKeyValidated,
  } = useAuth();

  const [count, setCount] = useState(undefined);
  console.log(count, "count");

  const [isLoading, setIsLoading] = useState(true);
  const [selectedValue, setSelectedValue] = useState([]);
  const [buyTriggerData, setBuyTriggerData] = useState([]);
  const [sellTriggerData, setSellTriggerData] = useState([]);
  const [stopLoss, setStopLoss] = useState({
    type: "no",
    percentage: 0,
    active: false,
  });

  const [investments, setInvestments] = useState({
    minCapital: 100,
    maxCapital: 1000,
  });

  const [price, setPrice] = useState({ type: "free", amount: 0 });
  const [algorithmDetails, setAlgorithmDetails] = useState();
  const [prevBuyTriggers, setPrevBuyTriggers] = useState([]);
  const [prevSellTriggers, setPrevSellTriggers] = useState([]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  //console.log(isApiKeyValidated, "auth");

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        user: user,
        login: login,
        logout: logout,
        dealingIn: dealingIn,
        dealsIn: dealsIn,
        apiKeyValidated: apiKeyValidated,
        isApiKeyValidated: isApiKeyValidated,
      }}
    >
      <div>
        {isLoading && <LoadingSpinner />}
        {!isLoading && (
          <main>
            {dealsIn && <Navbar />}
            <Routes>
              <Route
                element={
                  <ProtectedRoute
                    token={token}
                    redirectPath="/"
                    loginRoute={true}
                  />
                }
              >
                <Route path="/login" element={<Login />} />
              </Route>

              <Route
                element={<ProtectedRoute token={token} redirectPath="/login" />}
              >
                <Route path="/" element={<Home />} />
                <Route
                  path="/crypto/validate-api-keys/:crypto"
                  element={<CryptoLogin />}
                />

                <Route path="/marketplace/:type/:subType">
                  <Route
                    index
                    element={
                      dealsIn === "stocks" ? (
                        <MarketPlace count={count} setCount={setCount} />
                      ) : (
                        <CryptoMarketplace />
                      )
                    }
                  />
                  <Route
                    path=":searchType"
                    element={
                      dealsIn === "stocks" ? (
                        <MarketPlace count={count} setCount={setCount} />
                      ) : (
                        <CryptoMarketplace />
                      )
                    }
                  />
                </Route>

                <Route
                  path="/marketplace/mirror-crypto-trades/:crypto"
                  element={<MirrorCryptoTrades />}
                />

                <Route path="/marketplace/build-my-algorithm">
                  <Route
                    index
                    element={
                      <BuildMyAlgorithm
                        buyTriggerData={buyTriggerData}
                        sellTriggerData={sellTriggerData}
                        setBuyTriggerData={setBuyTriggerData}
                        setSellTriggerData={setSellTriggerData}
                        selectedValue={selectedValue}
                        setSelectedValue={setSelectedValue}
                        stopLoss={stopLoss}
                        setStopLoss={setStopLoss}
                        investments={investments}
                        setInvestments={setInvestments}
                        price={price}
                        setPrice={setPrice}
                        count={count}
                        setCount={setCount}
                        algorithmDetails={algorithmDetails}
                        setAlgorithmDetails={setAlgorithmDetails}
                        prevBuyTriggers={prevBuyTriggers}
                        setPrevBuyTriggers={setPrevBuyTriggers}
                        prevSellTriggers={prevSellTriggers}
                        setPrevSellTriggers={setPrevSellTriggers}
                      />
                    }
                  />
                  <Route
                    path=":algoCode"
                    element={
                      <BuildMyAlgorithm
                        buyTriggerData={buyTriggerData}
                        sellTriggerData={sellTriggerData}
                        setBuyTriggerData={setBuyTriggerData}
                        setSellTriggerData={setSellTriggerData}
                        selectedValue={selectedValue}
                        setSelectedValue={setSelectedValue}
                        stopLoss={stopLoss}
                        setStopLoss={setStopLoss}
                        investments={investments}
                        setInvestments={setInvestments}
                        price={price}
                        setPrice={setPrice}
                        count={count}
                        setCount={setCount}
                        algorithmDetails={algorithmDetails}
                        setAlgorithmDetails={setAlgorithmDetails}
                        prevBuyTriggers={prevBuyTriggers}
                        setPrevBuyTriggers={setPrevBuyTriggers}
                        prevSellTriggers={prevSellTriggers}
                        setPrevSellTriggers={setPrevSellTriggers}
                      />
                    }
                  />
                </Route>
                <Route
                  path="/marketplace/algorithm-details/:criteria/:algoId"
                  element={<AlgorithmDetails />}
                />
                <Route
                  path="/marketplace/configure-buy-triggers"
                  element={
                    <ConfigureBuyTriggers
                      buyTriggerData={buyTriggerData}
                      setBuyTriggerData={setBuyTriggerData}
                    />
                  }
                />
                <Route
                  path="/marketplace/configure-sell-triggers"
                  element={
                    <ConfigureSellTriggers
                      sellTriggerData={sellTriggerData}
                      setSellTriggerData={setSellTriggerData}
                    />
                  }
                />
              </Route>
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/recaptcha" element={<ReCaptcha />} />
            </Routes>
          </main>
        )}
      </div>
    </AuthContext.Provider>
  );
};

export default App;
