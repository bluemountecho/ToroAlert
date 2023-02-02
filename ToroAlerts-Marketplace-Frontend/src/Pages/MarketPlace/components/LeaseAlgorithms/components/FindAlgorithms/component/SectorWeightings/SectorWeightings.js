import React from "react";

const SectorWeightings = ({ sectorWeightings }) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-primary-blue">
        Sector Weightings (%)
      </h1>
      <div className="mt-5 border border-primary-blue-lt rounded-xl px-5 pb-5 pt-2 w-[615px]">
        <div className="leading-10 grid grid-cols-4 text-lg font-medium text-primary-blue border-b border-ternary-blue">
          <p className="col-span-3">Sector(s)</p>
          <p className="text-center">{sectorWeightings?.ticker}</p>
        </div>
        <div className="mt-3">
          {sectorWeightings?.sectorWeightings.map((value, index) => (
            <div
              key={index}
              className="grid grid-cols-4 items-center text-lg font-normal text-primary-blue"
            >
              <p className="col-span-2 border-r border-ternary-blue">
                {value.sectorName}
              </p>
              <div className="mx-2 col-span-1 h-3 bg-white">
                <div
                  style={{ width: `${value.sharePercentage}%` }}
                  className="bg-neon-green h-3"
                ></div>
              </div>
              <p className="col-span-1 text-center border-l border-ternary-blue">
                {value.sharePercentage}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectorWeightings;
