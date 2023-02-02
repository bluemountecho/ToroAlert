import React, { useEffect, useState } from "react";
import BackArrow from "../../assets/SVG/back-arrow";
import RoundedCross from "../../assets/SVG/rounded-cross";
import Button from "../Button/Button";
import AssetAllocation from "./components/AssetAllocation/AssetAllocation";
import data from "../../helpers/data/stock.json";
import Searchbar from "../Searchbar/Searchbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../helpers/axios/axios";
import "./build-my-algorithm.css";
import LoadingSpinner from "../Spinners/LoadingSpinner/LoadingSpinner";
import ConfigureTriggers from "./components/ConfigureTriggers/ConfigureTriggers";
import { BASE_URL } from "../../helpers/url/url";

const BuildMyAlgorithm = ({
  buyTriggerData,
  sellTriggerData,
  selectedValue,
  setSelectedValue,
  stopLoss,
  setStopLoss,
  investments,
  setInvestments,
  price,
  setPrice,
  count,
  setCount,
  algorithmDetails,
  setAlgorithmDetails,
  prevBuyTriggers,
  prevSellTriggers,
  setPrevBuyTriggers,
  setPrevSellTriggers,
  setBuyTriggerData,
  setSellTriggerData,
}) => {
  const navigate = useNavigate();
  const { algoCode } = useParams();

  const [showAssetAllocation, setShowAssetAllocation] = useState(false);
  const [currentValue, setCurrentValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isFieldsLoading, setIsFieldsLoading] = useState(true);
  const [isLoading, setIsLoading] = useState({ id: "" });
  const [algorithmCode, setAlgorithmCode] = useState(algoCode);
  const [isMainPageLoading, setIsMainPageLoading] = useState(true);

  console.log(algorithmDetails, "algorithmDetails");
  // console.log("selectedValue", selectedValue);
  // console.log("algorithCode", algorithmCode);
  // console.log("algoCode from params", algoCode);
  // console.log("buyTriggerData", buyTriggerData);
  // console.log("sellTriggerData", sellTriggerData);
  // console.log("count", count);
  // console.log("prevBuyTriggers", prevBuyTriggers);
  // console.log("filteredData", filteredData);

  useEffect(() => {
    const getAlgorithmDetailsAPI = async () => {
      setIsMainPageLoading(true);
      try {
        const response = await axios.post(
          `${BASE_URL}/api/algorithm/details/myAlgorithms`
        );
        //console.log("algorithm details", response);
        const algorithm = response?.data?.data.filter(
          (algo) => algo.code === algoCode
        );
        let stocks = [];
        algorithm[0]?.stocks.map((stock) =>
          stocks.push({
            name: stock.tickerId,
            percentage: stock.assetAllocationPercentage,
          })
        );
        let stopLoss = {
          type: algorithm[0]?.stopLoss.type,
          percentage: algorithm[0]?.stopLoss.percentValue,
          active: algorithm[0]?.stopLoss.active,
        };

        let prevBuyTrigger = [];
        let prevSellTrigger = [];

        for (let i = 0; i < algorithm[0]?.triggersData.length; i++) {
          if (algorithm[0]?.triggersData[i].triggerType === "buy") {
            let buyTrigger = {};

            for (let key in algorithm[0]?.triggersData[i]) {
              if (algorithm[0]?.triggersData[i][key].applied) {
                // prevBuyTrigger.push({
                //   [key]: algorithm[0]?.triggersData[i][key],
                // });
                buyTrigger = {
                  ...buyTrigger,
                  [key]: algorithm[0]?.triggersData[i][key],
                };
              }
            }
            prevBuyTrigger.push({
              triggers: buyTrigger,
              triggerId: algorithm[0]?.triggersData[i]._id,
            });
          } else {
            let sellTrigger = {};
            for (let key in algorithm[0]?.triggersData[i]) {
              if (algorithm[0]?.triggersData[i][key].applied) {
                sellTrigger = {
                  ...sellTrigger,
                  [key]: algorithm[0]?.triggersData[i][key],
                };
              }
            }
            prevSellTrigger.push({
              triggers: sellTrigger,
              triggerId: algorithm[0]?.triggersData[i]._id,
            });
          }
        }

        setPrevBuyTriggers([...prevBuyTrigger]);
        setPrevSellTriggers([...prevSellTrigger]);
        setAlgorithmDetails([...algorithm]);
        setSelectedValue([...stocks]);
        setStopLoss({ ...stopLoss });
        setInvestments({
          minCapital: algorithm[0]?.minCapital,
          maxCapital: algorithm[0]?.maxCapital,
        });
        setPrice({ ...algorithm[0]?.price });
        setIsMainPageLoading(false);
      } catch (err) {
        console.log(err);
        setIsMainPageLoading(false);
      }
    };

    if (algoCode !== undefined && count === undefined) {
      getAlgorithmDetailsAPI();
      setBuyTriggerData([]);
      setSellTriggerData([]);
      setCount(1);
    }
    //else if (algoCode === undefined && count.current !== undefined) {
    //   count.current = undefined;
    //   setIsMainPageLoading(false);
    //   //setSelectedValue([{ name: "AAPL", percentage: 1 }]);
    //   // setStopLoss({
    //   //   type: "no",
    //   //   percentage: 0,
    //   //   active: false,
    //   // });
    //   // setInvestments({
    //   //   minCapital: 100,
    //   //   maxCapital: 1000,
    //   // });
    //   // setPrice({ type: "free", amount: 0 });
    //   setPrevBuyTriggers([]);
    //   setPrevSellTriggers([]);
    //   setSellTriggerData([]);
    //   setBuyTriggerData([]);
    // }
    else if (algoCode === undefined && count === undefined) {
      setCount(1);
      setSelectedValue([{ name: "AAPL", percentage: 1 }]);
      setStopLoss({
        type: "no",
        percentage: 0,
        active: false,
      });
      setInvestments({
        minCapital: 100,
        maxCapital: 1000,
      });
      setPrice({ type: "free", amount: 0 });
      setPrevBuyTriggers([]);
      setPrevSellTriggers([]);
      setBuyTriggerData([]);
      setSellTriggerData([]);
      setAlgorithmDetails([]);

      setIsMainPageLoading(false);
    } else {
      setIsMainPageLoading(false);
    }
  }, [
    algoCode,
    setSelectedValue,
    setInvestments,
    setPrice,
    setStopLoss,
    count,
    setAlgorithmDetails,
    setPrevBuyTriggers,
    setPrevSellTriggers,
    setSellTriggerData,
    setBuyTriggerData,
    setCount,
  ]);

  const handleInputChange = (e) => {
    const searchWord = e.target.value;
    setCurrentValue(searchWord);
    setIsFieldsLoading(true);
    const newFilter = data.stocks.filter((value) => {
      return value.ticker.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
    setTimeout(() => {
      setIsFieldsLoading(false);
    }, 1000);
  };

  const handleSelectedValue = (ticker) => {
    // const Value = data.stocks.filter((value) => {
    //   return value.toLowerCase().includes(ticker.toLowerCase());
    // });

    setCurrentValue(ticker);
    setFilteredData([]);
    // setSelectedValue(Value[0]);
  };

  console.log(data.stocks, "data");

  const checkIfTickerAlreadyAdded = (ticker) => {
    return selectedValue.find((value) => value.name === ticker.toUpperCase());
  };

  const checkIfTickerIsValid = (ticker) => {
    console.log("ticker", ticker);
    return data.stocks.find(
      (value) => value.ticker.toUpperCase() === ticker.toUpperCase()
    );
  };

  const handleAddStocks = () => {
    if (
      currentValue !== "" &&
      checkIfTickerAlreadyAdded(currentValue) === undefined &&
      checkIfTickerIsValid(currentValue)
    ) {
      console.log(checkIfTickerIsValid(currentValue));
      setSelectedValue([
        ...selectedValue,
        { name: currentValue.toUpperCase(), percentage: 1 },
      ]);
    }

    setFilteredData([]);
    setCurrentValue("");
  };

  const clearInput = () => {
    setFilteredData([]);
    setCurrentValue("");
    setSelectedValue("");
  };

  const closeAssetAllocationModal = () => {
    setShowAssetAllocation(false);
  };

  const deleteAddedTickerHandler = (ticker) => {
    const remainingTickers = selectedValue.filter(
      (value) => value.name !== ticker
    );
    setSelectedValue([...remainingTickers]);
  };

  let selectedTickers = [];
  let percentageAllocated = [];

  for (let i = 0; i < selectedValue.length; i++) {
    selectedTickers.push(selectedValue[i].name);
    percentageAllocated.push(selectedValue[i].percentage);
  }

  console.log("selectedTickers", selectedTickers);

  const addStocksAPI = async (code) => {
    setIsLoading({ id: "save-button" });
    try {
      const response = await axios.post(
        `${BASE_URL}/api/algorithm/stock/update`,
        {
          algorithmCode: code,
          tickers: selectedTickers,
          assetAllocationPercentages: percentageAllocated,
        }
      );
      console.log("Add Stock Response", response);
      // if (response) {
      //   for (let i = 0; i < buyTriggerData.length; i++) {
      //     addTriggerDataAPI(code, "buy", buyTriggerData[i]);
      //   }
      //   for (let i = 0; i < sellTriggerData.length; i++) {
      //     addTriggerDataAPI(code, "sell", sellTriggerData[i]);
      //   }
      // }
      setIsLoading({ id: "" });
    } catch (err) {
      console.log(err);
      setIsLoading({ id: "" });
    }
  };

  const updateCapitalAPI = async (code) => {
    setIsLoading({ id: "save-button" });
    try {
      const response = await axios.post(
        `${BASE_URL}/api/algorithm/update/capital`,
        {
          algorithmCode: code,
          minCapital: investments.minCapital,
          maxCapital: investments.maxCapital,
        }
      );
      console.log("update capital Response", response);
      setIsLoading({ id: "" });
    } catch (err) {
      console.log(err);
      setIsLoading({ id: "" });
    }
  };

  const addStoplossAPI = async (code) => {
    setIsLoading({ id: "save-button" });
    try {
      const response = await axios.post(
        `${BASE_URL}/api/algorithm/update/stoploss`,
        {
          algorithmCode: code,
          active: stopLoss.active,
          type: stopLoss.type,
          percentValue: stopLoss.percentage,
        }
      );
      console.log("Add Stoploss Response", response);
      setIsLoading({ id: "" });
    } catch (err) {
      console.log(err);
      setIsLoading({ id: "" });
    }
  };

  const addPriceAPI = async (code) => {
    setIsLoading({ id: "save-button" });
    try {
      const response = await axios.post(
        `${BASE_URL}/api/algorithm/update/price`,
        {
          algorithmCode: code,
          type: price.type,
          amount: price.amount,
        }
      );
      console.log("Add Stoploss Response", response);
      setIsLoading({ id: "" });
    } catch (err) {
      console.log(err);
      setIsLoading({ id: "" });
    }
  };

  const addTriggerDataAPI = async (code, triggerType, triggerData) => {
    setIsLoading({ id: "save-button" });
    try {
      const response = await axios.post(`${BASE_URL}/api/trigger/add`, {
        algorithmCode: code,
        stockTickers: selectedTickers,
        triggerType: triggerType,
        triggerData: triggerData,
      });
      console.log(response, "add-trigger-response");
      setIsLoading({ id: "" });
    } catch (err) {
      console.log(err);
      setIsLoading({ id: "" });
    }
  };

  const backtestAlgorithmAPI = async () => {
    setIsLoading({ id: "backtest-algo" });
    //setIsMainPageLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/api/algorithm/backtest`, {
        code: algorithmCode,
      });
      console.log("Backtest Response", response);

      if (response) {
        //window.location.reload();

        //setIsMainPageLoading(false);
        setIsLoading({ id: "" });
        setCount(undefined);
      }
    } catch (err) {
      console.log(err);
      setIsLoading({ id: "" });
    }
  };

  const deleteSavedTriggersAPI = async (triggerId) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/trigger/remove`, {
        algorithmCode: algorithmCode,
        tickerId: [...selectedTickers],
        triggerId: triggerId,
      });
      console.log("Delete", response);
      if (response) {
        //window.location.reload();
        setCount(undefined);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const saveAlgorithmAPI = async () => {
    if (algorithmCode !== undefined) {
      addStocksAPI(algorithmCode);
      addStoplossAPI(algorithmCode);
      updateCapitalAPI(algorithmCode);
      addPriceAPI(algorithmCode);
      for (let i = 0; i < buyTriggerData.length; i++) {
        addTriggerDataAPI(algorithmCode, "buy", buyTriggerData[i]);
      }
      for (let i = 0; i < sellTriggerData.length; i++) {
        addTriggerDataAPI(algorithmCode, "sell", sellTriggerData[i]);
      }
      navigate(`/marketplace/build-my-algorithm/${algorithmCode}`);
    } else {
      setIsLoading({ id: "save-button" });
      try {
        const response = await axios.post(`${BASE_URL}/api/algorithm/create`);
        //console.log(response);
        if (response) {
          const code = response?.data?.code;
          if (code) {
            addStocksAPI(code);
            addStoplossAPI(code);
            updateCapitalAPI(code);
            addPriceAPI(code);
            setAlgorithmCode(code);

            for (let i = 0; i < buyTriggerData.length; i++) {
              addTriggerDataAPI(code, "buy", buyTriggerData[i]);
            }
            for (let i = 0; i < sellTriggerData.length; i++) {
              addTriggerDataAPI(code, "sell", sellTriggerData[i]);
            }
            navigate(`/marketplace/build-my-algorithm/${code}`);
          }

          setIsLoading({ id: "" });
        }
      } catch (err) {
        console.log(err);
        setIsLoading({ id: "" });
      }
    }
  };

  const deleteUnsavedTriggers = (triggerData, type, idx) => {
    const filteredTriggers = triggerData.filter(
      (trigger, index) => index !== idx
    );
    if (type === "buy") {
      setBuyTriggerData([...filteredTriggers]);
    } else if (type === "sell") {
      setSellTriggerData([...filteredTriggers]);
    }
  };

  const checkAmountAllowed = (amount, type) => {
    if (amount <= 0) {
      if (type === "price") {
        setPrice({ ...price, amount: 1 });
      } else if (type === "min-capital") {
        setInvestments({ ...investments, minCapital: 1 });
      } else if (type === "max-capital") {
        setInvestments({ ...investments, maxCapital: 1 });
      }
    }
  };

  return (
    <div className="max-w-screen px-20 py-14">
      {isMainPageLoading && <LoadingSpinner />}

      {!isMainPageLoading && (
        <div>
          <div className="flex items-center space-x-3 mb-10">
            <BackArrow
              className="w-9 h-9 cursor-pointer"
              onClick={() => {
                setCount(undefined);
                navigate("/marketplace/my-algorithms/build-algorithms");
              }}
            />
            <span className="text-4xl font-bold text-primary-blue">
              Build my Algorithm
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-5 mb-10">
              {algorithmCode !== undefined && (
                <div className="flex items-center space-x-3 ">
                  <p className="text-xl font-bold text-primary-blue">
                    Algo Code:
                  </p>
                  <p className="text-xl font-medium text-ternary-blue-lt">
                    {algorithmCode}
                  </p>
                </div>
              )}
              <Button
                isLoading={isLoading.id === "save-button"}
                onClick={saveAlgorithmAPI}
                innerText="Save changes"
                extraClass=" text-md xl:text-lg text-primary-blue-lt bg-white border border-primary-yellow font-medium"
              />
            </div>
            <div className="flex space-x-10">
              {/************* Add Stocks *************/}
              <div className="max-w-xl border border-ternary-blue rounded-xl p-5">
                <div className="flex items-center justify-between ">
                  <h3 className="text-xl font-bold text-primary-blue mr-5">
                    Add Stocks:
                  </h3>
                  <div className="flex items-center space-x-5">
                    <div>
                      <Searchbar
                        extraClass=" w-[220px] bg-ternary-blue "
                        value={currentValue}
                        onChange={handleInputChange}
                        clearInput={clearInput}
                        placeholder="Add ticker"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleAddStocks();
                          }
                        }}
                      />

                      {filteredData.length > 0 && !isFieldsLoading && (
                        <ul className="bg-white absolute z-10 shadow-lg w-[220px] rounded-md py-5">
                          {filteredData.slice(0, 3).map((value, index) => {
                            return (
                              <div
                                key={index}
                                onClick={() =>
                                  handleSelectedValue(value.ticker)
                                }
                                className="cursor-pointer hover:bg-ternary-blue-ltr-ltr mb-2 py-2 px-5"
                              >
                                <p className="text-base text-primary-blue font-medium mb-1">
                                  {value.ticker}
                                </p>
                              </div>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                    <Button
                      onClick={() => handleAddStocks()}
                      innerText="Add"
                      type="text"
                      extraClass="bg-primary-yellow text-primary-blue-lt text-lg font-medium"
                    />
                  </div>
                </div>
                <div className="mt-5 border-t border-ternary-blue">
                  <div className="flex items-center justify-between mt-5">
                    <p className="text-xl font-bold text-primary-blue">
                      Your list:
                    </p>
                    <Button
                      innerText="Asset Allocation"
                      type="button"
                      extraClass="text-md xl:text-lg text-primary-blue-lt bg-primary-yellow font-medium"
                      onClick={() => setShowAssetAllocation(true)}
                    />
                  </div>
                  <div className="flex items-center flex-wrap mt-5">
                    {selectedValue.length > 0 &&
                      selectedValue?.map((ticker, index) => (
                        <div
                          key={index}
                          className="mt-3 mr-3 max-w-max px-3 py-2 flex items-center space-x-2 border border-ternary-blue rounded"
                        >
                          <p className="text-base text-primary-blue font-medium">
                            {ticker.name}: {ticker.percentage}%
                          </p>
                          <RoundedCross
                            onClick={() =>
                              deleteAddedTickerHandler(ticker.name)
                            }
                            className="w-4 h-4 cursor-pointer"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/************* Add Stoploss *************/}
              <div className="text-center w-[350px] border border-ternary-blue rounded-xl p-5">
                <div>
                  <h3 className="text-xl font-bold text-primary-blue">
                    Add Stoploss
                  </h3>
                  <div className="text-left mt-3 border-t border-ternary-blue">
                    <div className="mt-7 mb-3">
                      <input
                        checked={stopLoss.type === "no"}
                        type="radio"
                        name="type-of-stoploss"
                        id="no-stoploss"
                        value="no"
                        onChange={(e) =>
                          setStopLoss({
                            ...stopLoss,
                            type: e.target.value,
                            active: false,
                          })
                        }
                        className="checkbox"
                      />
                      <label
                        className="ml-3 text-xl text-primary-blue font-normal"
                        htmlFor="no-stoploss"
                      >
                        No Stoploss
                      </label>
                    </div>
                    <div className="my-3">
                      <input
                        type="radio"
                        checked={stopLoss.type === "trailing"}
                        name="type-of-stoploss"
                        id="trailing-stoploss"
                        value="trailing"
                        onChange={(e) =>
                          setStopLoss({
                            ...stopLoss,
                            type: e.target.value,
                            active: true,
                          })
                        }
                        className="checkbox"
                      />
                      <label
                        className=" ml-3 text-xl text-primary-blue font-normal"
                        htmlFor="trailing-stoploss"
                      >
                        Trailing Stoploss
                      </label>
                    </div>
                    <div className="my-3">
                      <input
                        type="radio"
                        name="type-of-stoploss"
                        id="fixed-stoploss"
                        value="fixed"
                        onChange={(e) =>
                          setStopLoss({
                            ...stopLoss,
                            type: e.target.value,
                            active: true,
                          })
                        }
                        checked={stopLoss.type === "fixed"}
                        className="checkbox"
                      />
                      <label
                        className="ml-3 text-xl text-primary-blue font-normal"
                        htmlFor="fixed-stoploss"
                      >
                        Fixed Stoploss
                      </label>
                    </div>
                    {stopLoss.type !== "no" && (
                      <div className="w-full flex item-center text-lg text-primary-blue font-medium border border-ternary-blue rounded-md px-3 py-2 mt-7 mb-5">
                        <input
                          style={{
                            width: `${
                              stopLoss.percentage.length
                                ? stopLoss.percentage.length * 10
                                : 15
                            }px`,
                          }}
                          type="number"
                          //placeholder="Add %"
                          className="text-lg text-primary-blue font-medium focus:outline-none placeholder:text-ternary-blue-lt placeholder:text-xl"
                          value={stopLoss.percentage}
                          onChange={(e) => {
                            setStopLoss({
                              ...stopLoss,
                              percentage: e.target.value,
                            });
                          }}
                        />
                        <p className="text-lg font-medium text-primary-blue">
                          %
                        </p>
                      </div>
                    )}
                    {/* <Button
                  innerText="Save"
                  type="button"
                  extraClass="w-full text-md xl:text-lg text-primary-blue-lt bg-primary-yellow font-medium"
                  onClick={() => console.log("stopLoss", stopLoss)}
                /> */}
                  </div>
                </div>
              </div>
              {/************* Set Investments *************/}
              <div className="text-center w-[300px] border border-ternary-blue rounded-xl p-5">
                <div className="h-full">
                  <h3 className="text-xl font-bold text-primary-blue">
                    Set Investments
                  </h3>
                  <div className="flex flex-col h-full text-left mt-3 border-t border-ternary-blue">
                    <div className="flex space-x-5 mt-7 mb-10">
                      <span className="text-lg font-medium text-primary-blue">
                        Min Capital:
                      </span>
                      <div className="flex items-center space-x-1 border-b border-ternary-blue w-[100px] px-2 text-lg text-primary-blue font-medium">
                        <p>$</p>
                        <input
                          type="number"
                          id="min-capital"
                          className="w-[80px] text-lg text-primary-blue font-medium focus:outline-none"
                          value={investments.minCapital}
                          onChange={(e) =>
                            setInvestments({
                              ...investments,
                              minCapital: e.target.value,
                            })
                          }
                          onBlur={() =>
                            checkAmountAllowed(
                              investments.minCapital,
                              "min-capital"
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="flex space-x-5">
                      <span className="text-lg font-medium text-primary-blue">
                        Max Capital:
                      </span>
                      <div className="flex items-center space-x-1 border-b border-ternary-blue w-[100px] px-2 text-lg text-primary-blue font-medium">
                        <p>$</p>
                        <input
                          type="number"
                          id="max-capital"
                          className="w-[80px] text-lg text-primary-blue font-medium focus:outline-none "
                          value={investments.maxCapital}
                          onChange={(e) =>
                            setInvestments({
                              ...investments,
                              maxCapital: e.target.value,
                            })
                          }
                          onBlur={() =>
                            checkAmountAllowed(
                              investments.maxCapital,
                              "max-capital"
                            )
                          }
                        />
                      </div>
                    </div>
                    {/* <div className="mt-auto mb-9">
                  <Button
                    innerText="Save"
                    type="button"
                    extraClass="w-full text-md xl:text-lg text-primary-blue-lt bg-primary-yellow font-medium"
                    onClick={() => console.log("investments", investments)}
                  />
                </div> */}
                  </div>
                </div>
              </div>
            </div>
            {/************* Configure Buy Triggers *************/}
            {(buyTriggerData.length > 0 ||
              sellTriggerData.length > 0 ||
              prevBuyTriggers.length > 0 ||
              prevSellTriggers.length > 0) && (
              <ConfigureTriggers
                buyTriggerData={buyTriggerData}
                prevBuyTriggers={prevBuyTriggers}
                prevSellTriggers={prevSellTriggers}
                sellTriggerData={sellTriggerData}
                deleteUnsavedTriggers={deleteUnsavedTriggers}
                deleteSavedTriggersAPI={deleteSavedTriggersAPI}
              />
            )}
            {prevSellTriggers.length === 0 &&
              prevBuyTriggers.length === 0 &&
              buyTriggerData.length === 0 &&
              sellTriggerData.length === 0 && (
                <div className="mt-10 w-1/2 border border-ternary-blue rounded-xl p-7 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-primary-blue">
                    Configure Buy Triggers
                  </h2>
                  <Button
                    onClick={() =>
                      navigate("/marketplace/configure-buy-triggers")
                    }
                    innerText="Add Buy Triggers"
                    type="button"
                    extraClass="text-md xl:text-lg text-primary-blue-lt bg-primary-yellow font-medium"
                  />
                </div>
              )}

            {/************* Configure Sell Triggers *************/}
            {prevSellTriggers.length === 0 &&
              prevBuyTriggers.length === 0 &&
              buyTriggerData.length === 0 &&
              sellTriggerData.length === 0 && (
                <div className="mt-10 w-1/2 border border-ternary-blue rounded-xl p-7 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-primary-blue">
                    Configure Sell Triggers
                  </h2>
                  <Button
                    onClick={() =>
                      navigate("/marketplace/configure-sell-triggers")
                    }
                    innerText="Add Sell Triggers"
                    type="button"
                    extraClass="text-md xl:text-lg text-primary-blue-lt bg-primary-yellow font-medium"
                  />
                </div>
              )}
            {/************* Price Offer For Algorithm *************/}
            <div className="mt-10 w-[30%] border border-ternary-blue rounded-xl py-5">
              <h2 className="ml-5 text-xl font-bold text-primary-blue">
                Price offer for Algorithm
              </h2>
              <div className=" mt-3 border-t border-ternary-blue flex items-center justify-between">
                <div className="my-5 ml-10">
                  <input
                    checked={price.type === "free"}
                    type="radio"
                    name="price"
                    id="free"
                    value="free"
                    onChange={(e) =>
                      setPrice({ type: e.target.value, amount: 0 })
                    }
                    className="checkbox"
                  />
                  <label
                    className="ml-3 text-xl text-primary-blue font-normal"
                    htmlFor="free"
                  >
                    Free
                  </label>
                </div>
                <div className="my-5 mr-10">
                  <input
                    checked={price.type === "monthly"}
                    type="radio"
                    name="price"
                    id="monthly"
                    value="monthly"
                    onChange={(e) =>
                      setPrice({ ...price, type: e.target.value })
                    }
                    className="checkbox"
                  />
                  <label
                    className="ml-3 text-xl text-primary-blue font-normal"
                    htmlFor="monthly"
                  >
                    Monthly
                  </label>
                </div>
                {/* <div className="my-5">
                  <input
                    type="radio"
                    name="price"
                    id="annually"
                    value="annually"
                    onChange={(e) =>
                      setPrice({ ...price, type: e.target.value })
                    }
                    className="checkbox flex items-center space-x-2"
                  />
                  <label
                    className="ml-3 text-xl text-primary-blue font-normal"
                    htmlFor="annually"
                  >
                    Annually
                  </label>
                </div> */}
              </div>
              {price.type === "monthly" && (
                <div className="flex items-center space-x-3">
                  <label className="text-xl text-primary-blue font-normal ml-9">
                    Set Price:
                  </label>
                  <div className="flex items-center space-x-1 w-[160px] border border-ternary-blue px-3 py-2 rounded text-lg text-primary-blue font-medium">
                    <p>$</p>
                    <input
                      className="focus:outline-none font-medium w-[120px] text-lg text-primary-blue-lt placeholder:text-ternary-blue-lt"
                      type="number"
                      name="price-value"
                      placeholder="0.0"
                      value={price.amount}
                      onChange={(e) =>
                        setPrice({ ...price, amount: e.target.value })
                      }
                      onBlur={() => checkAmountAllowed(price.amount, "price")}
                    />
                  </div>
                  {/* <Button
                onClick={() => console.log("price", price)}
                innerText="Save"
                type="button"
                extraClass="text-md xl:text-lg text-primary-blue-lt bg-primary-yellow font-medium"
              /> */}
                </div>
              )}
            </div>
            <div className="flex items-center space-x-10">
              <Button
                isLoading={isLoading.id === "backtest-algo"}
                disabled={
                  algorithmCode === undefined ||
                  isLoading.id === "backtest-algo"
                }
                onClick={backtestAlgorithmAPI}
                innerText={
                  algorithmDetails !== undefined &&
                  algorithmDetails[0]?.backTest?.submitted &&
                  algorithmDetails[0]?.backTest?.approved
                    ? "Successfully Backtested"
                    : algorithmDetails !== undefined &&
                      algorithmDetails[0]?.backTest?.submitted
                    ? "Submitted for Backtest"
                    : "Backtest my Algorithm"
                }
                Icon={
                  algorithmDetails !== undefined &&
                  algorithmDetails[0]?.backTest?.submitted &&
                  algorithmDetails[0]?.backTest?.approved
                    ? true
                    : false
                }
                extraClass={
                  algorithmDetails !== undefined &&
                  algorithmDetails[0]?.backTest?.submitted &&
                  algorithmDetails[0]?.backTest?.approved
                    ? "my-10 text-md xl:text-lg text-primary-yellow bg-primary-blue-lt font-medium"
                    : "my-10 text-md xl:text-lg text-primary-blue-lt bg-primary-yellow font-medium"
                }
              />
              <Button
                isLoading={isLoading.id === "save-button"}
                onClick={saveAlgorithmAPI}
                innerText="Save changes"
                extraClass="my-10 text-md xl:text-lg text-primary-blue-lt bg-white border border-primary-yellow font-medium"
              />
            </div>
            {algorithmDetails !== undefined &&
              algorithmDetails[0]?.backTest?.submitted &&
              algorithmDetails[0]?.backTest?.approved && (
                <Button
                  innerText="Submit for Lease"
                  extraClass="max-w-max text-md xl:text-lg text-primary-blue-lt bg-primary-yellow font-medium"
                />
              )}
          </div>
          {showAssetAllocation && (
            <AssetAllocation
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
              onCloseModal={closeAssetAllocationModal}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default BuildMyAlgorithm;
