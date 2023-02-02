import React from "react";
import { useNavigate } from "react-router-dom";
import DeleteBin from "../../../../assets/SVG/delete-bin";
import Button from "../../../Button/Button";

const ConfigureTriggers = ({
  buyTriggerData,
  sellTriggerData,
  prevBuyTriggers,
  prevSellTriggers,
  deleteUnsavedTriggers,
  deleteSavedTriggersAPI,
}) => {
  const navigate = useNavigate();

  console.log("prevBuyTriggers", prevBuyTriggers);
  console.log("prevSellTriggers", prevSellTriggers);

  let totalBuyTriggers;
  let totalSellTriggers;

  if (prevBuyTriggers) {
    totalBuyTriggers = buyTriggerData.length + prevBuyTriggers.length;
  } else {
    totalBuyTriggers = buyTriggerData.length;
  }
  if (prevSellTriggers) {
    totalSellTriggers = sellTriggerData.length + prevSellTriggers.length;
  } else {
    totalSellTriggers = sellTriggerData.length;
  }

  const maxTriggers = Math.max(totalBuyTriggers, totalSellTriggers);

  const remainingBuyTriggers = maxTriggers - totalBuyTriggers;
  const remainingSellTriggers = maxTriggers - totalSellTriggers;

  console.log("maxTriggers", maxTriggers);
  console.log("remainingSellTriggers", remainingSellTriggers);
  console.log("remainingBuyTriggers", remainingBuyTriggers);
  console.log("buyTriggerData", buyTriggerData);

  const generateEmptyTriggersUI = (length, type) => {
    let remainingTriggers = [];

    if (length > 0) {
      console.log("length", length, "type", type);
      for (let i = 0; i < length; i++) {
        remainingTriggers.push(
          <div
            key={i}
            className="grid grid-cols-10 gap-x-5 place-items-center border-t border-ternary-blue"
          >
            <p
              className={
                type === "Sell"
                  ? "col-span-1 text-primary-red"
                  : "col-span-1 text-secondary-green"
              }
            >
              {type.toUpperCase()}
            </p>
            <div className="col-span-1 w-[1px] h-full bg-ternary-blue"></div>
            <div className="col-span-7 my-5 place-self-start">
              <Button
                onClick={() =>
                  navigate(
                    `/marketplace/configure-${type.toLowerCase()}-triggers`
                  )
                }
                innerText={`Add ${type} Triggers `}
                type="button"
                extraClass="text-xl xl:text-sm text-primary-blue-lt bg-primary-yellow font-medium"
              />
            </div>
          </div>
        );
      }
      if (remainingTriggers.length > 0) {
        return remainingTriggers;
      }
    }
    console.log(remainingTriggers, "remainingTriggers");
  };

  return (
    <div className="mt-10 w-[90%] rounded-xl border border-ternary-blue">
      <h1 className="p-5 font-semibold text-xl text-primary-blue">
        Configure Triggers
      </h1>
      <div className="w-full h-[1px] bg-ternary-blue"></div>
      <div className="flex">
        <div className="w-1/2 px-10 py-5 ">
          <div className="grid grid-cols-10 gap-x-5 place-items-center">
            <p className="py-5 cols-span-1 font-medium text-lg text-primary-blue">
              Trigger
            </p>
            <div className="col-span-1 w-[1px] h-full bg-ternary-blue"></div>
            <div className="col-span-6 flex items-center justify-between">
              <p className="py-5 mr-3 font-medium text-lg text-primary-blue">
                Technical Indicators
              </p>
              <Button
                onClick={() => navigate("/marketplace/configure-buy-triggers")}
                innerText="Add New"
                type="button"
                extraClass="text-sm xl:text-sm text-primary-blue-lt bg-primary-yellow font-medium"
              />
            </div>
            <div className="col-span-1 w-[1px] h-full bg-ternary-blue"></div>
            <div className="col-span-1"></div>
          </div>

          {prevBuyTriggers &&
            prevBuyTriggers.length === 0 &&
            buyTriggerData.length === 0 && (
              <div className="w-full bg-ternary-blue h-[0.5px]"></div>
            )}

          {prevBuyTriggers &&
            prevBuyTriggers.length > 0 &&
            prevBuyTriggers.map((triggerData, index) => (
              <div
                key={index}
                className="grid grid-cols-10 gap-x-5 place-items-center border-t border-ternary-blue"
              >
                <p className="col-span-1 text-secondary-green">BUY</p>
                <div className="col-span-1 w-[1px] h-full bg-ternary-blue"></div>
                <div className="col-span-6 my-5 place-self-start">
                  {Object.entries(triggerData.triggers).map(([key, value]) => (
                    <p
                      className="mb-1 text-sm text-primary-blue font-normal"
                      key={key}
                    >
                      {key.toUpperCase()}: {value.notification}
                    </p>
                  ))}
                </div>
                <div className="col-span-1 w-[1px] h-full bg-ternary-blue"></div>
                <DeleteBin
                  onClick={() => deleteSavedTriggersAPI(triggerData.triggerId)}
                  className="col-span-1 h-[22px] w-[22px] cursor-pointer fill-primary-blue-lt hover:fill-primary-red"
                />
              </div>
            ))}

          {buyTriggerData &&
            buyTriggerData.length > 0 &&
            buyTriggerData.map((triggerData, index) => (
              <div
                key={index}
                className="grid grid-cols-10 gap-x-5 place-items-center border-t border-ternary-blue"
              >
                <p className="col-span-1 text-secondary-green">BUY</p>
                <div className="col-span-1 w-[1px] h-full bg-ternary-blue"></div>
                <div className="col-span-6 my-5 place-self-start">
                  {Object.entries(triggerData).map(([key, value]) => (
                    <p
                      className="mb-1 text-sm text-primary-blue font-normal"
                      key={key}
                    >
                      {key.toUpperCase()}: {value.notification}
                    </p>
                  ))}
                </div>
                <div className="col-span-1 w-[1px] h-full bg-ternary-blue"></div>
                <DeleteBin
                  onClick={() =>
                    deleteUnsavedTriggers(buyTriggerData, "buy", index)
                  }
                  className="col-span-1 h-[22px] w-[22px] cursor-pointer fill-primary-blue-lt hover:fill-primary-red"
                />
              </div>
            ))}
          {remainingBuyTriggers !== 0 &&
            generateEmptyTriggersUI(remainingBuyTriggers, "Buy")}
        </div>
        <div className="w-[1px] bg-primary-blue-lt h-auto"></div>
        <div className="w-1/2 px-10 py-5">
          <div className="grid grid-cols-10 gap-x-5 place-items-center">
            <p className="py-5 cols-span-1 font-medium text-lg text-primary-blue">
              Trigger
            </p>
            <div className="col-span-1 w-[1px] h-full bg-ternary-blue"></div>
            <div className="col-span-6 flex items-center justify-between">
              <p className="py-5 mr-3 font-medium text-lg text-primary-blue">
                Technical Indicators
              </p>
              <Button
                onClick={() => navigate("/marketplace/configure-sell-triggers")}
                innerText="Add New"
                type="button"
                extraClass="text-sm xl:text-sm text-primary-blue-lt bg-primary-yellow font-medium"
              />
            </div>
            <div className="col-span-1 w-[1px] h-full bg-ternary-blue"></div>
            <div className="col-span-1"></div>
          </div>
          {prevSellTriggers &&
            prevSellTriggers.length === 0 &&
            sellTriggerData.length === 0 && (
              <div className="w-full bg-ternary-blue h-[0.5px]"></div>
            )}

          {prevSellTriggers &&
            prevSellTriggers.length > 0 &&
            prevSellTriggers.map((triggerData, index) => (
              <div
                key={index}
                className="grid grid-cols-10 gap-x-5 place-items-center border-t border-ternary-blue"
              >
                <p className="col-span-1 text-primary-red">SELL</p>
                <div className="col-span-1 w-[1px] h-full bg-ternary-blue"></div>
                <div className="col-span-6 my-5 place-self-start">
                  {Object.entries(triggerData.triggers).map(([key, value]) => (
                    <p
                      className="mb-1 text-sm text-primary-blue font-normal"
                      key={key}
                    >
                      {key.toUpperCase()}: {value.notification}
                    </p>
                  ))}
                </div>
                <div className="col-span-1 w-[1px] h-full bg-ternary-blue"></div>
                <DeleteBin
                  onClick={() => deleteSavedTriggersAPI(triggerData.triggerId)}
                  className="col-span-1 h-[22px] w-[22px] cursor-pointer fill-primary-blue-lt hover:fill-primary-red"
                />
              </div>
            ))}

          {sellTriggerData &&
            sellTriggerData.length > 0 &&
            sellTriggerData.map((triggerData, index) => (
              <div
                key={index}
                className="grid grid-cols-10 gap-x-5 place-items-center border-t border-ternary-blue"
              >
                <p className="col-span-1 text-primary-red">SELL</p>
                <div className="col-span-1 w-[1px] h-full bg-ternary-blue"></div>
                <div className="col-span-6 my-5 place-self-start">
                  {Object.entries(triggerData).map(([key, value]) => (
                    <p
                      className="mb-1 text-sm text-primary-blue font-normal"
                      key={key}
                    >
                      {key.toUpperCase()}: {value.notification}
                    </p>
                  ))}
                </div>
                <div className="col-span-1 w-[1px] h-full bg-ternary-blue"></div>
                <DeleteBin
                  onClick={() =>
                    deleteUnsavedTriggers(sellTriggerData, "sell", index)
                  }
                  className="col-span-1 h-[22px] w-[22px] cursor-pointer fill-primary-blue-lt hover:fill-primary-red"
                />
              </div>
            ))}
          {remainingSellTriggers !== 0 &&
            generateEmptyTriggersUI(remainingSellTriggers, "Sell")}
        </div>
      </div>
    </div>
  );
};

export default ConfigureTriggers;
