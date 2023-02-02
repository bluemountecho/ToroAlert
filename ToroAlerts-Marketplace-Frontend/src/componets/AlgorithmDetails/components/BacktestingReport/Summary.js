import React from "react";
import { camel2title } from "../../../../helpers/functions/camel2title";

const Summary = ({ summaryData }) => {
  return (
    <div className="w-[620px] border border-ternary-blue p-5">
      {summaryData &&
        summaryData.summary &&
        summaryData?.summary?.length > 0 &&
        summaryData.summary.map((data) => (
          <div
            key={data.key}
            className="text-xl font-normal text-primary-blue-lt grid grid-cols-7"
          >
            <p className="my-3 col-span-4">{camel2title(data.key)}</p>

            <div className="h-full w-[1px] bg-ternary-blue"></div>

            <div className="col-span-2 text-right my-3 w-full">
              <p className="w-1/2">{data.value}</p>
            </div>
          </div>
        ))}
      <div className="grid grid-cols-4 text-center mt-10">
        <p className="p-2 border border-ternary-blue text-xl font-medium text-primary-blue-lt">
          Maximum
        </p>
        <p className="p-2 border-t border-b border-ternary-blue text-xl font-medium text-primary-blue-lt">
          Day
        </p>
        <p className="p-2 border border-ternary-blue text-xl font-medium text-primary-blue-lt">
          Week
        </p>
        <p className="p-2 border-t border-b border-r border-ternary-blue text-xl font-medium text-primary-blue-lt">
          Month
        </p>
        <p className="p-2 border-l border-r border-ternary-blue text-xl font-normal text-primary-blue-lt">
          Gain
        </p>
        <p className="p-2 border-b border-r border-ternary-blue text-xl font-normal text-secondary-green">
          {summaryData.maximumGainDay.length > 0
            ? `+${summaryData.maximumGainDay[0].value}`
            : "NIL"}
        </p>
        <p className="p-2 border-b border-r border-ternary-blue  text-xl font-normal text-secondary-green">
          {summaryData.maximumGainWeek.length > 0
            ? `+${summaryData.maximumGainWeek[0].value}`
            : "NIL"}
        </p>
        <p className="p-2 border-b border-r border-ternary-blue  text-xl font-normal text-secondary-green">
          {summaryData.maximumGainMonth.length > 0
            ? `+${summaryData.maximumGainMonth[0].value}`
            : "NIL"}
        </p>
        <p className="p-2 border border-ternary-blue text-xl font-normal text-primary-blue-lt">
          Loss
        </p>
        <p className="p-2 border-b border-r border-ternary-blue text-xl font-normal text-primary-red">
          {summaryData.maximumLossDay.length > 0
            ? summaryData.maximumLossDay[0].value
            : "NIL"}
        </p>
        <p className="p-2 border-b border-r border-ternary-blue text-xl font-normal text-primary-red">
          {summaryData.maximumLossWeek.length > 0
            ? summaryData.maximumLossWeek[0].value
            : "NIL"}
        </p>
        <p className="p-2 border-b border-r border-ternary-blue text-xl font-normal text-primary-red">
          {summaryData.maximumLossMonth.length > 0
            ? summaryData.maximumLossMonth[0].value
            : "NIL"}
        </p>
      </div>
    </div>
  );
};

export default Summary;
