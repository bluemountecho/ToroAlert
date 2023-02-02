import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularArrow from "../../../../../../assets/SVG/circular-arrow";
import CircularArrowBack from "../../../../../../assets/SVG/circular-arrow-back";
import AlgoCard from "../../../../../../componets/AlgoCard/AlgoCard";
import LoadingSpinner from "../../../../../../componets/Spinners/LoadingSpinner/LoadingSpinner";
import axios from "../../../../../../helpers/axios/axios";
import { BASE_URL } from "../../../../../../helpers/url/url";

const PendingAlgorithms = ({ allAlgorithms, isMainPageLoading }) => {
  const [algoCount, setAlgoCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const pendingAlgorithms = allAlgorithms.filter(
    (algo) => algo.status === "pending"
  );

  pendingAlgorithms.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  console.log("pendingAlgorithms", pendingAlgorithms);

  const navigate = useNavigate();

  const manageAlgoFavoriteAPI = async (algoCode, favourites) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/user/manageFavourite`,
        {
          algorithmCode: algoCode,
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

  return (
    <div>
      {(isLoading || isMainPageLoading) && <LoadingSpinner />}
      {!isLoading && !isMainPageLoading && (
        <div>
          {pendingAlgorithms.length === 0 && (
            <h1 className="text-center text-xl text-ternary-blue font-normal mt-14">
              No algorithms in pending.
            </h1>
          )}
          <div
            className={
              pendingAlgorithms.slice(algoCount + 2).length > 0
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
            {pendingAlgorithms.slice(algoCount, algoCount + 3).map((algo) => (
              <AlgoCard
                key={algo.code}
                returnsData={algo?.backtestData[0]?.report?.returns}
                userName={algo?.associatedUsername}
                triggersData={algo.triggersData}
                algoCode={algo.code}
                stocks={algo.stocks}
                stopLoss={algo?.stopLoss?.active}
                manageAlgoFavoriteAPI={manageAlgoFavoriteAPI}
                //favourites={algo?.favouriteAlgorithmData?.isFavourite}
                favouriteButton={false}
                buttonText="Edit Algorithm"
                onClick={() =>
                  navigate(`/marketplace/build-my-algorithm/${algo.code}`)
                }
              />
            ))}
            {pendingAlgorithms.slice(algoCount + 3).length > 0 && (
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

export default PendingAlgorithms;
