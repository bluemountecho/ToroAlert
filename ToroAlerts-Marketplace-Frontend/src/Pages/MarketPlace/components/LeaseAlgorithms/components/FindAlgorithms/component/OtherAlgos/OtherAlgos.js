import React, { useEffect, useState } from "react";
import Button from "../../../../../../../../componets/Button/Button";
import Dropdown from "../../../../../../../../componets/Dropdown/Dropdown";
import Table from "../../../../../../../../componets/Table/Table";
import classes from "./other-algos.module.css";
import { algorithmColumns } from "../../../../../../../../componets/Table/Columns/Columns";
import axios from "../../../../../../../../helpers/axios/axios";
import LoadingSpinner from "../../../../../../../../componets/Spinners/LoadingSpinner/LoadingSpinner";
import { BASE_URL } from "../../../../../../../../helpers/url/url";

const sectors = [
  {
    id: "basic-materials",
    name: "Basic Materials",
  },
  {
    id: "financial-services",
    name: "Financial Services",
  },
  {
    id: "consumer-defensive",
    name: "Consumer Defensive",
  },
  {
    id: "energy",
    name: "Energy",
  },
  {
    id: "consumer-cyclical",
    name: "Consumer Cyclical",
  },
  {
    id: "real-estates",
    name: "Real Estates",
  },
  { id: "healthcare", name: "Healthcare" },
  { id: "technology", name: "Technology" },
  { id: "utilities", name: "Utilities" },
  { id: "industrials", name: "Industrials" },
  { id: "communication-services", name: "Communications Services" },
  { id: "any", name: "Any" },
];

let checker = (arr, target) => {
  if (arr.includes("any")) {
    console.log("from 1");
    return true;
  } else {
    console.log("from 2");
    return arr.every((v) => target.includes(v));
  }
};

const OtherAlgos = () => {
  const [minReturns, setMinReturns] = useState(10);
  const [maxReturns, setMaxReturns] = useState(100);
  const [numberOfStocks, setNumberOfStocks] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMainPageLoading, setIsMainPageLoading] = useState(true);
  const [selectedSectors, setSelectedSectors] = useState(["any"]);
  const [returnType, setReturnType] = useState({
    id: "days_30",
    name: "30 days",
  });

  const [checkedState, setCheckedState] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
  ]);

  useEffect(() => {
    const getOtherAlogsAPI = async () => {
      setIsMainPageLoading(true);
      try {
        const response = await axios.post(`${BASE_URL}/api/algorithm/match`, {
          returnType: "days_30",
          low: 10,
          high: 100,
        });
        //console.log(response);

        let table_data = [];
        response?.data?.data.map((algo) =>
          table_data.push({
            code: algo?.code,
            view: "view",
            stockSectorsInAlgorithm: algo?.stockSectorsInAlgorithm,
            ...algo?.backtestData?.report?.returns,
          })
        );

        setTableData(table_data);
        setIsMainPageLoading(false);
      } catch (err) {
        console.error(err);
        setIsMainPageLoading(false);
      }
    };

    getOtherAlogsAPI();
  }, []);

  let TABLE_DATA = tableData;

  const getOtherAlogsAPI = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/api/algorithm/match`, {
        returnType: returnType.id,
        low: minReturns,
        high: maxReturns,
      });
      console.log(response);

      TABLE_DATA = [];
      response?.data?.data.map((algo) =>
        TABLE_DATA.push({
          code: algo?.code,
          view: "view",
          stockSectorsInAlgorithm: algo?.stockSectorsInAlgorithm,
          ...algo?.backtestData?.report?.returns,
        })
      );

      if (response) {
        filter();
      }

      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  const filter = () => {
    let updatedTableData = [];
    if (TABLE_DATA.length > 0) {
      for (let i = 0; i < TABLE_DATA.length; i++) {
        if (
          TABLE_DATA[i][returnType.id] > minReturns &&
          TABLE_DATA[i][returnType.id] < maxReturns &&
          TABLE_DATA[i].stockSectorsInAlgorithm.length > numberOfStocks
        ) {
          if (checker(selectedSectors, TABLE_DATA[i].stockSectorsInAlgorithm)) {
            updatedTableData.push(TABLE_DATA[i]);
          }
        }
      }
    }
    setTableData(updatedTableData);
  };

  const handleOnChange = (position) => {
    let updatedCheckedState = [];
    let updatedSelectedSectors = [];
    if (position === 11 && checkedState[position] === false) {
      updatedCheckedState = [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        true,
      ];
      updatedSelectedSectors = ["any"];
    } else {
      updatedCheckedState = checkedState.map((item, index) =>
        index === position ? !item : item
      );

      for (let i = 0; i < updatedCheckedState.length; i++) {
        if (updatedCheckedState[i] !== false) {
          updatedSelectedSectors.push(sectors[i].id);
        }
      }
    }

    setCheckedState(updatedCheckedState);
    setSelectedSectors(updatedSelectedSectors);
    filter();
  };

  return (
    <div>
      {isMainPageLoading && <LoadingSpinner />}
      {!isMainPageLoading && (
        <div className="mt-10">
          <div className="relative flex items-center space-x-5 mb-10">
            <div>
              <Dropdown
                options={[
                  { id: "days_30", name: "30 days" },
                  { id: "days_90", name: "90 days" },
                  { id: "year_1", name: "1 year" },
                  { id: "year_3", name: "3 years" },
                  { id: "year_5", name: "5 years" },
                ]}
                defaultValue={{ id: "30-days", name: "30 days" }}
                currentValue={returnType}
                setCurrentValue={setReturnType}
              />
            </div>
            <p className="text-2xl font-medium text-primary-blue-lt">
              Return more than
            </p>
            <input
              value={minReturns}
              onChange={(e) => setMinReturns(e.target.value)}
              type="text"
              id="more-than"
              className="text-2xl text-secondary-blue text-center focus:outline-none border-b border-primary-blue w-20"
            />
            <p className="text-2xl font-medium text-primary-blue-lt">
              less than
            </p>
            <input
              value={maxReturns}
              onChange={(e) => setMaxReturns(e.target.value)}
              type="text"
              id="less-than"
              className="text-2xl text-secondary-blue text-center focus:outline-none border-b border-primary-blue w-20"
            />
          </div>
          <div className="flex items-center space-x-5 mb-10">
            <p className="text-2xl font-medium text-primary-blue-lt">
              Algorithms with stocks greater than
            </p>
            <input
              value={numberOfStocks}
              onChange={(e) => setNumberOfStocks(e.target.value)}
              type="text"
              id="number-of-stocks"
              className="text-2xl text-secondary-blue text-center focus:outline-none border-b border-primary-blue w-20"
            />
          </div>
          <div>
            <p className="text-2xl font-medium text-primary-blue-lt mb-5">
              Based on Sector:
            </p>
            <div className="grid grid-cols-4 gap-x-8 items-center  border border-primary-blue-ltr rounded p-5 max-w-max">
              {sectors.map((sector, index) => (
                <div key={sector.id} className="flex items-center my-3">
                  <input
                    className={classes.checkbox}
                    type="checkbox"
                    id={sector.id}
                    value={sector.name}
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index)}
                  />
                  <label
                    className="ml-2 text-xl font-normal text-secondary-blue"
                    htmlFor={sector.id}
                  >
                    {sector.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <Button
            isLoading={isLoading}
            onClick={getOtherAlogsAPI}
            innerText="Search"
            type="button"
            extraClass="my-10 max-w-max text-md xl:text-lg text-primary-blue-lt bg-primary-yellow font-medium"
          />
          {TABLE_DATA.length === 0 && (
            <h2 className="text-left text-xl text-ternary-blue font-normal">
              No Algorithms Present
            </h2>
          )}
          {!isMainPageLoading && TABLE_DATA.length > 0 && (
            <Table
              title="ALGORITHM LIST"
              tableData={TABLE_DATA}
              COLUMNS={algorithmColumns}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default OtherAlgos;
