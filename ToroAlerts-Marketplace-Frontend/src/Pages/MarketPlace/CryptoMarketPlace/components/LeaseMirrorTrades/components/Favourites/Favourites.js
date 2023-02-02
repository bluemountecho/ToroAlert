import React, { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import CircularArrow from "../../../../../../../assets/SVG/circular-arrow";
import CircularArrowBack from "../../../../../../../assets/SVG/circular-arrow-back";
import AlgoCard from "../../../../../../../componets/AlgoCard/AlgoCard";
import LoadingSpinner from "../../../../../../../componets/Spinners/LoadingSpinner/LoadingSpinner";
import axios from "../../../../../../../helpers/axios/axios";
import { BASE_URL } from "../../../../../../../helpers/url/url";

const FavouritesMirrorTrades = () => {
  const [favAlgorithms, setfavAlgorithms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [algoCount, setAlgoCount] = useState(0);

  //const navigate = useNavigate();

  //console.log("favAlgo", favAlgorithms);

  useEffect(() => {
    const getFavouriteMirrorTrades = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/user/allFavouriteMirrorTrades`
        );
        //console.log(response);
        let favAlgos = [];
        if (
          response?.data?.favouriteMirrorTrades[0]?.mirrorTradeData.length > 0
        ) {
          favAlgos =
            response?.data?.favouriteMirrorTrades[0]?.mirrorTradeData?.sort(
              (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
            );
          let finalfavAlgos = [];
          for (let j = 0; j < favAlgos.length; j++) {
            const tradingHistoryData = favAlgos[j].report.tradingHistory;
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
            finalfavAlgos.push({ ...favAlgos[j], stocks: stocks });
          }

          setfavAlgorithms([...finalfavAlgos]);
        }

        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    getFavouriteMirrorTrades();
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
      if (response) {
        window.location.reload();
      }
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
          {favAlgorithms.length === 0 && (
            <h1 className="text-center text-xl text-ternary-blue font-normal mt-14">
              No algorithms found.
            </h1>
          )}
          <div
            className={
              favAlgorithms.slice(algoCount + 2).length > 0
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
            {favAlgorithms.slice(algoCount, algoCount + 3).map((algo) => (
              <AlgoCard
                key={algo.code}
                userName={algo?.associatedUsername}
                returnsData={algo?.report?.returns}
                triggersData={algo?.triggersData}
                algoCode={algo?.code}
                stocks={algo?.stocks}
                //sfavLoss={algo?.sfavLoss?.active}
                manageAlgoFavoriteAPI={manageAlgoFavoriteAPI}
                manageSubscribeAlgoAPI={manageSubscribeAlgoAPI}
                favourites={true}
                subscribed={algo?.isSubscribed}
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
            {favAlgorithms.slice(algoCount + 3).length > 0 && (
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

export default FavouritesMirrorTrades;
