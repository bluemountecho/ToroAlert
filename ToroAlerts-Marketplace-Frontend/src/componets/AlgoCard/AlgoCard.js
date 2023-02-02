import React, { useState } from "react";
import Logo from "../../assets/SVG/logo";
import Star from "../../assets/SVG/star";
import Share from "../../assets/SVG/share";
import DeleteBin from "../../assets/SVG/delete-bin";
import { useNavigate } from "react-router-dom";
import SubscribeButton from "../SubscribeButton/SubscribeButton";

const AlgoCard = ({
  favouriteButton,
  deleteButton,
  triggersData,
  algoCode,
  stocks,
  stopLoss,
  favourites,
  buttonText,
  returnsData,
  manageAlgoFavoriteAPI,
  onClick,
  deleteAlgorithmAPI,
  userName,
  subscribeButton,
  subscribed,
  manageSubscribeAlgoAPI,
  showTiggerSection = true,
  isMirrorTradeCard = false,
}) => {
  const navigate = useNavigate();
  const [tempFav, setTempFav] = useState(false);

  let buyTriggerCount = 0;
  let sellTriggerCount = 0;

  for (let i = 0; i < triggersData?.length; i++) {
    if (triggersData[i]?.triggerType === "buy") {
      buyTriggerCount++;
    } else {
      sellTriggerCount++;
    }
  }

  return (
    <div className="w-[420px] h-[490px]">
      <div className="border-t border-r border-l border-primary-blue-ltr">
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center">
            <Logo className="w-5 h-5 xl:w-7 xl:h-7 mr-2 xl:mr-3" />
            <span className="text-secondary-blue text-lg xl:text-xl mr-1 xl:mr-2">
              by
            </span>
            <span className="text-primary-blue text-lg xl:text-xl font-medium">
              {userName ? userName : "User"}
            </span>
          </div>

          <div className="flex items-center space-x-2 2xl:space-x-4">
            {subscribeButton && (
              <SubscribeButton
                onClick={() => manageSubscribeAlgoAPI(algoCode, subscribed)}
                isSubscribed={subscribed}
              />
            )}
            {favouriteButton && (
              <Star
                onClick={() => {
                  setTempFav(true);
                  manageAlgoFavoriteAPI(algoCode, favourites);
                }}
                className={
                  favourites && tempFav
                    ? "cursor-pointer w-8 h-8 xl:w-10 xl:h-10 stroke-primary-blue-lt fill-white stroke-[1.5px]"
                    : favourites
                    ? "cursor-pointer w-8 h-8 xl:w-10 xl:h-10 stroke-primary-yellow fill-primary-yellow stroke-[1.5px]"
                    : tempFav
                    ? "cursor-pointer w-8 h-8 xl:w-10 xl:h-10 stroke-primary-yellow fill-primary-yellow stroke-[1.5px]"
                    : "cursor-pointer w-8 h-8 xl:w-10 xl:h-10 stroke-primary-blue-lt fill-white stroke-[1.5px]"
                }
              />
            )}

            <Share className="w-4 h-4 xl:w-5 xl:h-5" />
            {deleteButton && (
              <DeleteBin
                onClick={() => deleteAlgorithmAPI(algoCode)}
                className="h-[22px] w-[22px] cursor-pointer fill-primary-blue-lt hover:fill-primary-red"
              />
            )}
          </div>
        </div>

        <div className="w-full h-[1px] bg-ternary-blue-ltr"></div>

        <div className="p-5">
          <div className="text-md xl:text-lg font-medium flex items-center space-x-2">
            <h3 className="text-primary-blue">
              {isMirrorTradeCard ? "Mirror id:" : "Algo code:"}
            </h3>
            <span className="text-secondary-blue">
              {algoCode ? algoCode : "Not found"}
            </span>
          </div>

          <div className="h-[60px] text-sm xl:text-normal mt-5 grid grid-cols-4 text-center font-medium text-ternary-blue-lt">
            {stocks?.length <= 8 &&
              stocks?.map((stock) => (
                <span
                  key={stock?.tickerId}
                  className="h-[30px] py-1 px-2 border border-ternary-blue"
                >
                  {stock?.tickerId}
                </span>
              ))}
            {stocks.length > 8 &&
              stocks?.slice(0, 7).map((stock) => (
                <span
                  key={stock?.tickerId}
                  className="h-[30px] py-1 px-2 border border-ternary-blue"
                >
                  {stock?.tickerId}
                </span>
              ))}
            {stocks?.length > 8 && (
              <span
                onClick={() =>
                  navigate(`/algorithm-details/backtesting-report/${algoCode}`)
                }
                className="h-[30px] py-1 px-2 border border-ternary-blue"
              >
                +{stocks?.length - 7}
              </span>
            )}
          </div>

          {showTiggerSection && (
            <div className="mt-5 grid grid-cols-2 text-ternary-blue-lt font-normal text-xs xl:text-sm 2xl:text-lg text-center">
              <div className="p-2  border border-ternary-blue">
                <p>No. of Buy Triggers: {buyTriggerCount}</p>
                <p className="mt-2">No. of Sell Triggers: {sellTriggerCount}</p>
              </div>
              <div className="text-left p-2 px-3  border-r border-t border-b border-ternary-blue">
                <p>Stoploss: {stopLoss === true ? "Yes" : "No"}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border border-primary-blue-lt bg-primary-blue-lt flex items-center text-xs xl:text-base font-medium">
        <div className="p-4 flex flex-col space-y-2 text-center border-r border-ternary-blue-ltr-ltr">
          <span className="text-primary-green">
            {returnsData ? `${returnsData["days_30"]}%` : "N/A"}
          </span>
          <span className="text-secondary-white-lt">30-Days Return</span>
        </div>
        <div className="p-4 flex flex-col space-y-2 text-center border-r border-ternary-blue-ltr-ltr">
          <span className="text-primary-green text-base font-medium">
            {returnsData ? `${returnsData["days_90"]}%` : "N/A"}
          </span>
          <span className="text-secondary-white-lt">90-Days Return</span>
        </div>
        <div className="p-4 flex flex-col space-y-2 text-center ">
          <span className="text-primary-green text-base font-medium">
            {returnsData ? `${returnsData["year_1"]}%` : "N/A"}
          </span>
          <span className="text-secondary-white-lt">52-Week Return</span>
        </div>
      </div>

      <div
        onClick={onClick}
        className="cursor-pointer border border-primary-yellow bg-primary-yellow py-3 text-center"
      >
        <p className="text-sm xl:text-lg font-medium text-primary-blue-lt">
          {buttonText}
        </p>
      </div>
    </div>
  );
};

export default AlgoCard;
