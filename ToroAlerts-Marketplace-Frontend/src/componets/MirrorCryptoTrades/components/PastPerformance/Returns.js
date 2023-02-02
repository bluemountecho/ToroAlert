import React from "react";

const returns = [
  {
    time: "30-Days Return",
    percentage: "N/A",
  },
  {
    time: "52-Weeks Return",
    percentage: "N/A",
  },
  {
    time: "90-Days Return",
    percentage: "N/A",
  },
  {
    time: "2-Years Return",
    percentage: "N/A",
  },
  {
    time: "5-Years Return",
    percentage: "N/A",
  },
];

const Returns = ({ returnsData }) => {
  //   let fetchedReturns = [];

  //   for (let key in returnsData) {
  //     let indexOfUnderscore = key.indexOf("_");

  //     fetchedReturns.push({
  //       time:
  //         key.slice(indexOfUnderscore + 1) +
  //         " " +
  //         key.slice(0, 1).toUpperCase() +
  //         key.slice(1, indexOfUnderscore) +
  //         " Return",
  //       percentage: returnsData[key],
  //     });
  //   }

  return (
    <div>
      <div className="max-w-3xl border border-primary-blue-ltr py-7 flex">
        {returns.length > 0 &&
          returns.map((value, index) => (
            <div
              key={index}
              className={
                index === returns.length - 1
                  ? "text-center"
                  : "text-center border-r border-ternary-blue-ltr-ltr mr-5"
              }
            >
              <p className="text-xl font-semibold text-secondary-green">
                {value.percentage}%
              </p>
              <p className="text-lg font-normal text-primary-blue mx-4 mt-2">
                {value.time}
              </p>
            </div>
          ))}
      </div>
      <p className="mt-1 text-lg font-normal text-primary-blue-lt">
        *Backtesting certified by ToroAlerts
      </p>
    </div>
  );
};

export default Returns;
