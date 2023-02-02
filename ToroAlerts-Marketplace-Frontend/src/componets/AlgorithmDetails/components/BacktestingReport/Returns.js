import React from "react";

const returns = [
  {
    time: "30-Days Return",
    percentage: "51.23%",
  },
  {
    time: "52-Weeks Return",
    percentage: "68.56%",
  },
  {
    time: "90-Days Return",
    percentage: "74.56%",
  },
  {
    time: "2-Years Return",
    percentage: "85.56%",
  },
  {
    time: "5-Years Return",
    percentage: "92.75%",
  },
];

const Returns = ({ returnsData }) => {
  let fetchedReturns = [];

  for (let key in returnsData) {
    let indexOfUnderscore = key.indexOf("_");

    fetchedReturns.push({
      time:
        key.slice(indexOfUnderscore + 1) +
        " " +
        key.slice(0, 1).toUpperCase() +
        key.slice(1, indexOfUnderscore) +
        " Return",
      percentage: returnsData[key],
    });
  }

  return (
    <div>
      <div className="max-w-3xl border border-primary-blue-ltr py-7 flex">
        {fetchedReturns.length > 0 &&
          fetchedReturns.map((value, index) => (
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
