import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularArrow from "../../../../../../assets/SVG/circular-arrow";
import CircularArrowBack from "../../../../../../assets/SVG/circular-arrow-back";
import AlgoCard from "../../../../../../componets/AlgoCard/AlgoCard";
import LoadingSpinner from "../../../../../../componets/Spinners/LoadingSpinner/LoadingSpinner";
import axios from "../../../../../../helpers/axios/axios";
import { BASE_URL } from "../../../../../../helpers/url/url";

const SubscribedAlgorithms = () => {
  const [subscribedAlgorithms, setSubscribedAlgorithms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [algoCount, setAlgoCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const getSubscribedAlogsAPI = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/user/allSubscriptions`
        );
        console.log(response);
        let subscribedAlgos = [];
        if (
          response?.data?.subscribedAlgorithms[0]?.algorithmsData.length > 0
        ) {
          subscribedAlgos =
            response?.data?.subscribedAlgorithms[0]?.algorithmsData.sort(
              (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
            );
          setSubscribedAlgorithms([...subscribedAlgos]);
        }
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    getSubscribedAlogsAPI();
  }, []);

  const manageAlgoFavoriteAPI = async (algoCode, favourites) => {
    try {
      await axios.post(`${BASE_URL}/api/user/manageFavourite`, {
        algorithmCode: algoCode,
        favourite: !favourites,
      });
      //console.log(response);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  const manageSubscribeAlgoAPI = async (algoCode, subscribed) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/user/manageSubscription`,
        {
          algorithmCode: algoCode,
          subscribe: !subscribed,
        }
      );
      //console.log(response);
      if (response) {
        window.location.reload();
      }
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
          {subscribedAlgorithms.length === 0 && (
            <h1 className="text-center text-xl text-ternary-blue font-normal mt-14">
              No algorithms found.
            </h1>
          )}
          <div
            className={
              subscribedAlgorithms.slice(algoCount + 2).length > 0
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
            {subscribedAlgorithms
              .slice(algoCount, algoCount + 3)
              .map((algo) => (
                <AlgoCard
                  key={algo?.code}
                  userName={algo?.associatedUsername}
                  returnsData={algo?.backtestData?.report?.returns}
                  triggersData={algo?.triggersData}
                  algoCode={algo?.code}
                  stocks={algo?.stocks}
                  stopLoss={algo?.stopLoss?.active}
                  favourites={algo?.isFavourite}
                  favouriteButton={true}
                  manageAlgoFavoriteAPI={manageAlgoFavoriteAPI}
                  manageSubscribeAlgoAPI={manageSubscribeAlgoAPI}
                  subscribed={true}
                  subscribeButton={true}
                  buttonText={
                    algo?.price?.type === "free"
                      ? "Subscribe this for FREE"
                      : `Subscribe this for $${algo?.price?.amount} month`
                  }
                  onClick={() =>
                    navigate(
                      `/marketplace/algorithm-details/backtesting-report/${algo?.code}`
                    )
                  }
                />
              ))}
            {subscribedAlgorithms.slice(algoCount + 3).length > 0 && (
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

export default SubscribedAlgorithms;
