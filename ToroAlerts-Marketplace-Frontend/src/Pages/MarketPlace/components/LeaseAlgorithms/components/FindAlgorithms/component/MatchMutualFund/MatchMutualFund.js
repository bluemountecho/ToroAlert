import React, { useState, useEffect } from "react";
import Searchbar from "../../../../../../../../componets/Searchbar/Searchbar";
import Table from "../../../../../../../../componets/Table/Table";
import SectorWeightings from "../SectorWeightings/SectorWeightings";
import { algorithmColumns } from "../../../../../../../../componets/Table/Columns/Columns";
import axios from "../../../../../../../../helpers/axios/axios";
import LoadingSpinner from "../../../../../../../../componets/Spinners/LoadingSpinner/LoadingSpinner";
import { BASE_URL } from "../../../../../../../../helpers/url/url";

const MatchMutualFund = () => {
  const [currentValue, setCurrentValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [isFieldsLoading, setIsFieldsLoading] = useState(false);
  const [isMainPageLoading, setIsMainPageLoading] = useState(true);
  const [mutualFunds, setMutualFunds] = useState([]);
  const [algorithmData, setAlgorithmData] = useState([]);

  useEffect(() => {
    const getMutualFundsAlgorithmsAPI = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/mutualFunds/match`);
        //console.log("response", response);
        setMutualFunds([...response.data.mutualFunds]);
        setIsMainPageLoading(false);
      } catch (err) {
        console.error(err);
        setIsMainPageLoading(false);
      }
    };
    getMutualFundsAlgorithmsAPI();
  }, []);

  const handleInputChange = (e) => {
    const searchWord = e.target.value;
    setCurrentValue(searchWord);
    setIsFieldsLoading(true);
    const newFilter = mutualFunds.filter((value) => {
      return value.ticker.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
    setTimeout(() => {
      setIsFieldsLoading(false);
    }, 1000);
  };

  const handleSelectedValue = (ticker) => {
    const Value = mutualFunds.filter((value) => {
      return value.ticker.toLowerCase().includes(ticker.toLowerCase());
    });

    setCurrentValue(ticker);
    setFilteredData([]);
    setSelectedValue(Value[0]);
    let selectedAlgoData = [];
    for (let i = 0; i < Value[0].algorithmsData.length; i++) {
      const algorithm = Value[0].algorithmsData[i];

      selectedAlgoData.push({
        code: algorithm.code,
        ...algorithm.backtestData.report.returns,
      });
    }
    setAlgorithmData([...selectedAlgoData]);
  };

  const clearInput = () => {
    setFilteredData([]);
    setCurrentValue("");
    setSelectedValue("");
  };

  return (
    <div>
      {isMainPageLoading && <LoadingSpinner />}
      {!isMainPageLoading && (
        <div>
          <div className="flex justify-between mt-10">
            <div>
              <div className="flex items-center space-x-5">
                <div>
                  <Searchbar
                    extraClass="w-[425px]"
                    value={currentValue}
                    onChange={handleInputChange}
                    clearInput={clearInput}
                    isLoading={isFieldsLoading}
                  />

                  {filteredData.length !== 0 && !isFieldsLoading && (
                    <ul className="shadow-lg w-full rounded-md py-5">
                      {filteredData.slice(0, 3).map((value, key) => {
                        return (
                          <div
                            key={key}
                            onClick={() => handleSelectedValue(value.ticker)}
                            className="cursor-pointer hover:bg-ternary-blue-ltr-ltr mb-2 py-2 px-5"
                          >
                            <p className="text-base text-primary-blue font-medium mb-1">
                              {value.ticker}
                            </p>
                            <p className="text-xs text-primary-blue-ltr font-medium">
                              {value.name}
                            </p>
                          </div>
                        );
                      })}
                    </ul>
                  )}
                </div>
                {/* <Button
              innerText="Match"
              type="text"
              extraClass="bg-primary-yellow text-primary-blue-lt text-lg font-medium"
            /> */}
              </div>

              {selectedValue !== "" && (
                <div className="bg-ternary-blue-result-bg rounded-lg max-w-xl p-5 my-10">
                  <h1 className="leading-10 text-2xl text-primary-blue font-semibold ">
                    {selectedValue.name}({selectedValue.ticker})
                  </h1>

                  <div className="w-full h-[1px] bg-ternary-blue my-3"></div>
                  <div>
                    <h1 className="my-5 text-2xl text-primary-blue font-medium">
                      Returns:
                    </h1>
                    <div className="grid grid-cols-3 gap-y-5 text-primary-blue text-lg my-4">
                      {selectedValue.returns.map((value, index) => (
                        <span key={index}>
                          {value.period}: {value.value}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {selectedValue && (
              <SectorWeightings sectorWeightings={selectedValue} />
            )}
          </div>

          {selectedValue && (
            <div className="mt-10">
              {algorithmData.length === 0 && (
                <h2 className="text-left text-xl text-ternary-blue font-normal">
                  No Algorithms Present
                </h2>
              )}
              {algorithmData.length > 0 && (
                <Table
                  title="ALGORITHM LIST"
                  tableData={algorithmData}
                  COLUMNS={algorithmColumns}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MatchMutualFund;
