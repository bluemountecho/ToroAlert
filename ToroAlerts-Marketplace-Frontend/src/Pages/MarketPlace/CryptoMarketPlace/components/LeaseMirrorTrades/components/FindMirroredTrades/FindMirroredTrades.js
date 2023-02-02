import React, { useEffect, useState } from "react";
import Button from "../../../../../../../componets/Button/Button";
import Dropdown from "../../../../../../../componets/Dropdown/Dropdown";
import LoadingSpinner from "../../../../../../../componets/Spinners/LoadingSpinner/LoadingSpinner";
import { findMirroredTradeColumns } from "../../../../../../../componets/Table/Columns/Columns";
import Table from "../../../../../../../componets/Table/Table";
import { BASE_URL } from "../../../../../../../helpers/url/url";
import axios from "../../../../../../../helpers/axios/axios";

const FindMirroredTrades = () => {
  const [isMainPageLoading, setIsMainPageLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [returnType, setReturnType] = useState({
    id: "days_30",
    name: "30 days",
  });
  const [minReturns, setMinReturns] = useState(0);
  const [maxReturns, setMaxReturns] = useState(100);
  const [minimumInvestments, setMinimumInvestments] = useState(0);
  const [maximumInvestments, setMaximumInvestments] = useState(1000000);
  const [tableData, setTableData] = useState([]);

  //console.log("tableData", tableData);

  useEffect(() => {
    const getOtherAlogsAPI = async () => {
      setIsMainPageLoading(true);
      try {
        const response = await axios.post(
          `${BASE_URL}/api/mirrorTrades/crypto/match`,
          {
            returnType: "days_30",
            low: 0,
            high: 100,
          }
        );
        //console.log(response);

        let table_data = [];
        response?.data?.matchedMirrorTrades.map((algo) =>
          table_data.push({
            code: algo?.code,
            view: "view",
            minimumInvestments: algo?.minCapital,
            maximumInvestments: algo?.maxCapital,
            ...algo?.report?.returns,
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
      const response = await axios.post(
        `${BASE_URL}/api/mirrorTrades/crypto/match`,
        {
          returnType: returnType.id,
          low: minReturns,
          high: maxReturns,
        }
      );
      //console.log(response);

      TABLE_DATA = [];
      response?.data?.matchedMirrorTrades.map((algo) =>
        TABLE_DATA.push({
          code: algo?.code,
          view: "view",
          minimumInvestments: algo?.minCapital,
          maximumInvestments: algo?.maxCapital,
          ...algo?.report?.returns,
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
          TABLE_DATA[i].minimumInvestments >= minimumInvestments &&
          TABLE_DATA[i].maximumInvestments <= maximumInvestments
        ) {
          updatedTableData.push(TABLE_DATA[i]);
        }
      }
    }
    setTableData(updatedTableData);
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
              Minimum Investments
            </p>
            <div className="text-2xl text-secondary-blue flex space-x-1 border-b border-primary-blue w-32">
              <p>$</p>
              <input
                value={minimumInvestments}
                onChange={(e) => setMinimumInvestments(e.target.value)}
                type="text"
                id="minimum-investments"
                className="focus:outline-none"
              />
            </div>
          </div>
          <div className="flex items-center space-x-5 mb-10">
            <p className="text-2xl font-medium text-primary-blue-lt">
              Maximum Investments
            </p>
            <div className="text-2xl text-secondary-blue flex space-x-1 border-b border-primary-blue w-32">
              <p>$</p>
              <input
                value={maximumInvestments}
                onChange={(e) => setMaximumInvestments(e.target.value)}
                type="text"
                id="maximum-investments"
                className="focus:outline-none"
              />
            </div>
          </div>
          <Button
            isLoading={isLoading}
            onClick={getOtherAlogsAPI}
            innerText="Search"
            type="button"
            extraClass="my-10 max-w-max text-md xl:text-lg text-primary-blue-lt bg-primary-yellow font-medium"
          />
          {tableData.length === 0 && (
            <h2 className="text-left text-xl text-ternary-blue font-normal">
              No Algorithms Present
            </h2>
          )}
          {!isMainPageLoading && tableData.length > 0 && (
            <Table
              title="MIRRORED TRADE"
              tableData={tableData}
              COLUMNS={findMirroredTradeColumns}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FindMirroredTrades;
