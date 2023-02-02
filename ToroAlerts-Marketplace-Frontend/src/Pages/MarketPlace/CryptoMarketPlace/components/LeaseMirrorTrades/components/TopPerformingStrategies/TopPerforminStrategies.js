import React, { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import CircularArrow from "../../../../../../../assets/SVG/circular-arrow";
import CircularArrowBack from "../../../../../../../assets/SVG/circular-arrow-back";
import AlgoCard from "../../../../../../../componets/AlgoCard/AlgoCard";
import LoadingSpinner from "../../../../../../../componets/Spinners/LoadingSpinner/LoadingSpinner";
import axios from "../../../../../../../helpers/axios/axios";
import { BASE_URL } from "../../../../../../../helpers/url/url";

const TopPerforminStrategies = () => {
  const [topAlgorithms, setTopAlgorithms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [algoCount, setAlgoCount] = useState(0);

  //const navigate = useNavigate();

  //console.log("topAlgo", topAlgorithms);

  useEffect(() => {
    const getTopPerforminStrategies = async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/mirrorTrades/crypto/details/topPerformingMirrorTrades`
        );
        //console.log(response);
        let topAlgos = [];
        if (response?.data?.data.length > 0) {
          topAlgos = response?.data?.data.sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
          let finalTopAlgos = [];
          for (let j = 0; j < topAlgos.length; j++) {
            const tradingHistoryData = topAlgos[j].report.tradingHistory;
            let stocks = [];
            for (let i = 0; i < tradingHistoryData.length; i++) {
              if (
                stocks.find(
                  (stock) => stock.tickerId === tradingHistoryData[i].ticker
                ) === undefined
              ) {
                stocks.push({ tickerId: tradingHistoryData[i].ticker });
              }
            }
            finalTopAlgos.push({ ...topAlgos[j], stocks: stocks });
          }

          setTopAlgorithms([...finalTopAlgos]);
        }

        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    getTopPerforminStrategies();
  }, []);

  const manageAlgoFavoriteAPI = async (mirrorTradeCode, favourites) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/user/manageFavouriteMirrorTrades`,
        {
          mirrorTradeCode: mirrorTradeCode,
          favourite: !favourites,
        }
      );
      console.log(response);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  const manageSubscribeAlgoAPI = async (mirrorTradeCode, subscribed) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/user/manageSubscriptionMirrorTrades`,
        {
          mirrorTradeCode: mirrorTradeCode,
          subscribe: !subscribed,
        }
      );
      console.log(response);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <div>
          {topAlgorithms.length === 0 && (
            <h1 className="text-center text-xl text-ternary-blue font-normal mt-14">
              No algorithms found.
            </h1>
          )}
          <div
            className={
              topAlgorithms.slice(algoCount + 2).length > 0
                ? "relative flex items-center space-x-5  xl:justify-between mt-10"
                : "relative flex items-center space-x-5 xl:space-x-20 mt-10"
            }
          >
            {algoCount > 0 && (
              <div
                className="absolute -left-2 cursor-pointer"
                onClick={() => setAlgoCount((prevCount) => prevCount - 1)}
              >
                <CircularArrowBack className="h-10 w-10" />
              </div>
            )}
            {topAlgorithms.slice(algoCount, algoCount + 3).map((algo) => (
              <AlgoCard
                key={algo.code}
                userName={algo?.associatedUsername}
                returnsData={algo?.report?.returns}
                triggersData={algo?.triggersData}
                algoCode={algo?.code}
                stocks={algo?.stocks}
                //stopLoss={algo?.stopLoss?.active}
                manageAlgoFavoriteAPI={manageAlgoFavoriteAPI}
                manageSubscribeAlgoAPI={manageSubscribeAlgoAPI}
                favourites={
                  algo?.userMirrorTradePrefrences
                    ? algo?.userMirrorTradePrefrences?.isFavourite
                    : false
                }
                subscribed={
                  algo?.userMirrorTradePrefrences
                    ? algo?.userMirrorTradePrefrences?.isSubscribed
                    : false
                }
                favouriteButton={true}
                subscribeButton={true}
                showTiggerSection={false}
                isMirrorTradeCard={true}
                buttonText={
                  algo?.price?.type === "free"
                    ? "Subscribe this for FREE"
                    : `Subscribe this for $${algo?.price?.amount} month`
                }
                // onClick={() =>
                //   navigate(
                //     `/algorithm-details/backtesting-report/${algo?.code}`
                //   )
                // }
              />
            ))}
            {topAlgorithms.slice(algoCount + 3).length > 0 && (
              <div
                className="absolute -right-6 cursor-pointer"
                onClick={() => setAlgoCount((prevCount) => prevCount + 1)}
              >
                <CircularArrow className="h-10 w-10" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopPerforminStrategies;
