import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackArrow from "../../assets/SVG/back-arrow";
import Logo from "../../assets/SVG/logo";
import Share from "../../assets/SVG/share";
import PlainBreadcrumb from "../Breadcrumb/PlainBreadcrumb/PlainBreadcrumb";
import PointerBreadcrumb from "../Breadcrumb/PointerBreadcrumb/PointerBreadcrumb";
import Returns from "./components/BacktestingReport/Returns";
import Summary from "./components/BacktestingReport/Summary";
import TradingHistory from "./components/BacktestingReport/TradingHistory";
import axios from "../../helpers/axios/axios";
import LoadingSpinner from "../Spinners/LoadingSpinner/LoadingSpinner";
import ListedStocks from "./components/ListedStocks/ListedStocks";
import { BASE_URL } from "../../helpers/url/url";

const AlgorithmDetails = () => {
  const navigate = useNavigate();
  const { criteria, algoId } = useParams();

  const [algoData, setAlgoData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentLabel, setCurrentLabel] = useState("summary");

  useEffect(() => {
    const getAlgorithmDetailsAPI = async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/algorithm/details/byAlgorithmCode`,
          {
            algorithmCode: algoId,
          }
        );
        //console.log(response, "algoDetails");
        const res = response?.data?.data;
        const summary = res?.backtestData.report.summary.filter(
          (value) =>
            value.key !== "maximumGainDay" &&
            value.key !== "maximumLossDay" &&
            value.key !== "maximumGainWeek" &&
            value.key !== "maximumLossWeek" &&
            value.key !== "maximumGainMonth" &&
            value.key !== "maximumLossMonth"
        );

        const maximumGainDay = res?.backtestData.report.summary.filter(
          (value) => value.key === "maximumGainDay"
        );
        const maximumLossDay = res?.backtestData.report.summary.filter(
          (value) => value.key === "maximumLossDay"
        );
        const maximumGainWeek = res?.backtestData.report.summary.filter(
          (value) => value.key === "maximumGainWeek"
        );
        const maximumLossWeek = res?.backtestData.report.summary.filter(
          (value) => value.key === "maximumLossWeek"
        );
        const maximumGainMonth = res?.backtestData.report.summary.filter(
          (value) => value.key === "maximumGainMonth"
        );
        const maximumLossMonth = res?.backtestData.report.summary.filter(
          (value) => value.key === "maximumLossMonth"
        );

        setAlgoData({
          code: res?.code,
          price: { ...res?.price },
          minCapital: res?.minCapital,
          maxCapital: res?.maxCapital,
          returns: res?.backtestData?.report.returns,
          summary: [...summary],
          tradingHistory: [...res?.backtestData.report.tradingHistory],
          stocks: [...res?.stocks],
          userName: res.associatedUsername,
          maximumGainDay: maximumGainDay,
          maximumLossDay: maximumLossDay,
          maximumGainWeek: maximumGainWeek,
          maximumLossWeek: maximumLossWeek,
          maximumGainMonth: maximumGainMonth,
          maximumLossMonth: maximumLossMonth,
        });
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };
    getAlgorithmDetailsAPI();
  }, [algoId]);

  return (
    <div>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <div className="max-w-screen px-20 py-14">
          <div className="flex items-center space-x-3">
            <BackArrow
              onClick={() => navigate(-1)}
              className="w-9 h-9 cursor-pointer"
            />
            <span className="text-4xl font-bold text-primary-blue">
              ToroAlerts Marketplace
            </span>
          </div>
          <div className="max-w-max border border-primary-blue-ltr rounded p-10 mt-10">
            <div className="flex items-center space-x-3">
              <Logo className="w-7 h-7" />
              <div className="flex items-center space-x-2">
                <span className="text-xl text-primary-blue-ltr">by</span>
                <span className="text-xl text-primary-blue font-medium">
                  {algoData.userName ? algoData.userName : "ToroAlerts"}
                </span>
              </div>
              <Share className="w-6 h-5" />
            </div>
            <div className="flex space-x-10 mt-10">
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <p className="text-lg font-medium text-primary-blue">
                    Algo Code:
                  </p>
                  <p className="text-lg font-normal text-primary-blue">
                    {algoData?.code}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-lg font-medium text-primary-blue">
                    Price:
                  </p>
                  <p className="text-lg font-normal text-primary-blue">
                    {`$${Number(algoData?.price?.amount).toLocaleString()}/${
                      algoData?.price?.type
                    }`}
                  </p>
                </div>
              </div>

              <div className="border-l border-ternary-blue-ltr">
                <div className="ml-5 flex items-center space-x-2 mb-3">
                  <p className="text-lg font-medium text-primary-blue">
                    Min Capital:
                  </p>
                  <p className="text-lg font-normal text-primary-blue">
                    {`$${Number(algoData?.minCapital).toLocaleString()}`}
                  </p>
                </div>
                <div className="ml-5 flex items-center space-x-2">
                  <p className="text-lg font-medium text-primary-blue">
                    Max Capital:
                  </p>
                  <p className="text-lg font-normal text-primary-blue">
                    {`$${Number(algoData?.maxCapital).toLocaleString()}`}
                  </p>
                </div>
              </div>

              <div className="text-center flex space-x-5 border-l border-ternary-blue-ltr">
                <div className="ml-5">
                  <p className="text-base text-secondary-green font-semibold mb-2">
                    {algoData?.returns?.days_30}%
                  </p>
                  <p className="text=base text-secondary-blue font-normal">
                    30-Days Return
                  </p>
                </div>

                <div className="border-l border-r border-ternary-blue-ltr">
                  <p className="text-base text-secondary-green font-semibold mx-5 mb-2">
                    {algoData?.returns?.days_90}%
                  </p>
                  <p className="text=base text-secondary-blue font-normal mx-5">
                    90-Days Return
                  </p>
                </div>

                <div>
                  <p className="text-base text-secondary-green font-semibold mb-2">
                    {algoData?.returns?.year_1}%
                  </p>
                  <p className="text=base text-secondary-blue font-normal">
                    52-Week Return
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <PointerBreadcrumb
              breadcrumbLabels={[
                {
                  label: "Backtesting Report",
                  url: `/marketplace/algorithm-details/backtesting-report/${algoId}`,
                },

                {
                  label: "Listed Stocks",
                  url: `/marketplace/algorithm-details/listed-stocks/${algoId}`,
                },
              ]}
            />
          </div>
          {criteria === "backtesting-report" && (
            <div className="mt-10">
              <PlainBreadcrumb
                currentLabel={currentLabel}
                setCurrentLabel={setCurrentLabel}
                breadcrumbLabels={[
                  {
                    label: "Summary",

                    id: "summary",
                  },
                  {
                    label: "Returns",

                    id: "returns",
                  },

                  {
                    id: "trading-history",
                    label: "Trading History",
                  },
                ]}
              />
            </div>
          )}
          {criteria === "backtesting-report" && (
            <div className="mt-10">
              {currentLabel === "summary" && <Summary summaryData={algoData} />}
              {currentLabel === "returns" && (
                <Returns returnsData={algoData?.returns} />
              )}
              {currentLabel === "trading-history" && (
                <TradingHistory tradingHistoryData={algoData?.tradingHistory} />
              )}
            </div>
          )}
          {criteria === "listed-stocks" && (
            <div className="mt-10">
              <ListedStocks tableData={algoData?.stocks} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AlgorithmDetails;
