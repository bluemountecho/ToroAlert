import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../../../../../assets/SVG/logo";
// import Share from "../../../../../../../assets/SVG/share";
// import Star from "../../../../../../../assets/SVG/star";
// import SubscribeButton from "../../../../../../../componets/SubscribeButton/SubscribeButton";

const NotConfiguredTrades = () => {
  //const [tempFav, setTempFav] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="mt-10 flex items-center space-x-20">
      <div className="w-[420px] h-[490px]">
        <div className="border-t border-r border-l border-primary-blue-ltr">
          <div className="flex items-center justify-between p-5">
            <div className="flex items-center">
              <Logo className="w-5 h-5 xl:w-7 xl:h-7 mr-2 xl:mr-3" />
              <span className="text-secondary-blue text-lg xl:text-xl mr-1 xl:mr-2">
                by
              </span>
              <span className="text-primary-blue text-lg xl:text-xl font-medium">
                ToroAlerts
              </span>
            </div>

            {/* <div className="flex items-center space-x-2 2xl:space-x-4">
              {/* {subscribeButton && ( */}
            {/* <SubscribeButton
              //onClick={() => manageSubscribeAlgoAPI(algoCode, subscribed)}
              //isSubscribed={subscribed}
              /> */}
            {/* )} */}
            {/* {favouriteButton && ( */}
            {/* <Star
                onClick={() => {
                  //setTempFav(true);
                  //manageAlgoFavoriteAPI(algoCode, favourites);
                }}
                className="cursor-pointer w-8 h-8 xl:w-10 xl:h-10 stroke-primary-yellow fill-primary-yellow stroke-[1.5px]"
              /> */}
            {/* )} */}
            {/* <Share className="w-4 h-4 xl:w-5 xl:h-5" /> */}
            {/* {deleteButton && (
                <DeleteBin
                  onClick={() => deleteAlgorithmAPI(algoCode)}
                  className="h-[22px] w-[22px] cursor-pointer fill-primary-blue-lt hover:fill-primary-red"
                />
              )} */}
            {/* </div> */}
          </div>

          <div className="w-full h-[1px] bg-ternary-blue-ltr"></div>

          <div className="p-5">
            <div className="text-md xl:text-lg font-medium flex items-center space-x-2">
              <h3 className="text-primary-blue">Platform:</h3>
              <span className="text-secondary-blue">Gemini</span>
            </div>
          </div>
        </div>

        <div className="border border-primary-blue-lt bg-primary-blue-lt flex items-center text-xs xl:text-base font-medium">
          <div className="p-4 flex flex-col space-y-2 text-center border-r border-ternary-blue-ltr-ltr">
            <span className="text-primary-green">N/A</span>
            <span className="text-secondary-white-lt">30-Days Return</span>
          </div>
          <div className="p-4 flex flex-col space-y-2 text-center border-r border-ternary-blue-ltr-ltr">
            <span className="text-primary-green text-base font-medium">
              N/A
            </span>
            <span className="text-secondary-white-lt">90-Days Return</span>
          </div>
          <div className="p-4 flex flex-col space-y-2 text-center ">
            <span className="text-primary-green text-base font-medium">
              N/A
            </span>
            <span className="text-secondary-white-lt">52-Week Return</span>
          </div>
        </div>

        <div
          onClick={() =>
            navigate("/marketplace/mirror-crypto-trades/gemini")
          }
          className="cursor-pointer border border-primary-yellow bg-primary-yellow py-3 text-center"
        >
          <p className="text-sm xl:text-lg font-medium text-primary-blue-lt">
            View Details
          </p>
        </div>
      </div>

      <div className="w-[420px] h-[490px]">
        <div className="border-t border-r border-l border-primary-blue-ltr">
          <div className="flex items-center justify-between p-5">
            <div className="flex items-center">
              <Logo className="w-5 h-5 xl:w-7 xl:h-7 mr-2 xl:mr-3" />
              <span className="text-secondary-blue text-lg xl:text-xl mr-1 xl:mr-2">
                by
              </span>
              <span className="text-primary-blue text-lg xl:text-xl font-medium">
                ToroAlerts
              </span>
            </div>

            {/* <div className="flex items-center space-x-2 2xl:space-x-4">
              {/* {subscribeButton && ( */}
            {/* <SubscribeButton
              //onClick={() => manageSubscribeAlgoAPI(algoCode, subscribed)}
              //isSubscribed={subscribed}
              /> */}
            {/* )} */}
            {/* {favouriteButton && ( */}
            {/* <Star
                onClick={() => {
                  //setTempFav(true);
                  //manageAlgoFavoriteAPI(algoCode, favourites);
                }}
                className="cursor-pointer w-8 h-8 xl:w-10 xl:h-10 stroke-primary-yellow fill-primary-yellow stroke-[1.5px]"
              /> */}
            {/* )} */}
            {/* <Share className="w-4 h-4 xl:w-5 xl:h-5" /> */}
            {/* {deleteButton && (
                <DeleteBin
                  onClick={() => deleteAlgorithmAPI(algoCode)}
                  className="h-[22px] w-[22px] cursor-pointer fill-primary-blue-lt hover:fill-primary-red"
                />
              )} */}
            {/* </div> */}
          </div>

          <div className="w-full h-[1px] bg-ternary-blue-ltr"></div>

          <div className="p-5">
            <div className="text-md xl:text-lg font-medium flex items-center space-x-2">
              <h3 className="text-primary-blue">Platform:</h3>
              <span className="text-secondary-blue">Coinbase</span>
            </div>
          </div>
        </div>

        <div className="border border-primary-blue-lt bg-primary-blue-lt flex items-center text-xs xl:text-base font-medium">
          <div className="p-4 flex flex-col space-y-2 text-center border-r border-ternary-blue-ltr-ltr">
            <span className="text-primary-green">N/A</span>
            <span className="text-secondary-white-lt">30-Days Return</span>
          </div>
          <div className="p-4 flex flex-col space-y-2 text-center border-r border-ternary-blue-ltr-ltr">
            <span className="text-primary-green text-base font-medium">
              N/A
            </span>
            <span className="text-secondary-white-lt">90-Days Return</span>
          </div>
          <div className="p-4 flex flex-col space-y-2 text-center ">
            <span className="text-primary-green text-base font-medium">
              N/A
            </span>
            <span className="text-secondary-white-lt">52-Week Return</span>
          </div>
        </div>

        <div
          onClick={() =>
            navigate("/marketplace/mirror-crypto-trades/coinbase")
          }
          className="cursor-pointer border border-primary-yellow bg-primary-yellow py-3 text-center"
        >
          <p className="text-sm xl:text-lg font-medium text-primary-blue-lt">
            View Details
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotConfiguredTrades;
