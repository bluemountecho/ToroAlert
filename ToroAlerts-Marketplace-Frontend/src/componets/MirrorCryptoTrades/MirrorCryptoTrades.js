import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackArrow from "../../assets/SVG/back-arrow";
import Logo from "../../assets/SVG/logo";
import Share from "../../assets/SVG/share";
import PlainBreadcrumb from "../Breadcrumb/PlainBreadcrumb/PlainBreadcrumb";
import Button from "../Button/Button";
import PointerTab from "../Breadcrumb/PointerBreadcrumb/PointerTab";
import Returns from "./components/PastPerformance/Returns";

import "./mirror-crypto-trades.css";

const TabLabel = {
  PastPerformance: "Past Performance",
  SalesHistory: "Sales History"
}

const MirrorCryptoTrades = () => {
  const navigate = useNavigate();
  const { crypto } = useParams();
  const [selTabLabel, setSelTabLabel] = useState(TabLabel.PastPerformance);
  const [priceType, setPriceType] = useState("free");

  const [investments, setInvestments] = useState({
    minCapital: 1000,
    maxCapital: 10000,
  });
  const [currentLabel, setCurrentLabel] = useState("summary");

  const checkAmountAllowed = (amount, type) => {
    if (amount <= 0) {
      if (type === "min-capital") {
        setInvestments({ ...investments, minCapital: 1 });
      } else if (type === "max-capital") {
        setInvestments({ ...investments, maxCapital: 1 });
      }
    }
  };

  const clickTabLabel = (label) => {
    setSelTabLabel(label)
  }

  return (
    <div className="max-w-screen px-20 py-14">
      <div className="flex items-center space-x-3 mb-10">
        <BackArrow
          className="w-9 h-9 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <span className="text-4xl font-bold text-primary-blue">
          Mirror Crypto Trades
        </span>
      </div>
      <div className="max-w-max border border-primary-blue-ltr rounded p-10 mt-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Logo className="w-7 h-7" />
            <div className="flex items-center space-x-2">
              <span className="text-xl text-primary-blue-ltr">by</span>
              <span className="text-xl text-primary-blue font-medium">
                ToroAlerts
              </span>
            </div>
            <Share className="w-6 h-5" />
          </div>
          <Button
            disabled={true}
            innerText="Submit for Sale"
            type="button"
            extraClass="border border-primary-blue-ltr-lt text-md xl:text-lg text-primary-blue-ltr bg-button-disabled font-medium"
          />
        </div>
        <div className="flex space-x-10 mt-10">
          <div>
            <div className="flex items-center space-x-2 mb-5">
              <p className="text-lg font-medium text-primary-blue">Platform</p>
              <p className="text-lg font-normal text-primary-blue capitalize">{crypto}</p>
            </div>

            <Button
              onClick={() => navigate(`/crypto/validate-api-keys/${crypto}`)}
              innerText="Configure"
              type="button"
              extraClass="text-md xl:text-lg text-primary-blue-lt bg-primary-yellow font-medium"
            />
          </div>

          {/************************Price*************************/}

          <div className="flex border-l border-ternary-blue-ltr">
            <p className="mx-10 text-lg font-medium text-primary-blue">
              Price:
            </p>
            <div>
              <div className="mb-3">
                <input
                  checked={priceType === "free"}
                  type="radio"
                  name="type-of-price"
                  id="free"
                  value="free"
                  onChange={(e) => setPriceType(e.target.value)}
                  className="checkbox"
                />
                <label
                  className="ml-3 text-xl text-primary-blue font-normal"
                  htmlFor="free"
                >
                  Free
                </label>
              </div>

              <div className="mb-3">
                <input
                  checked={priceType === "fixed"}
                  type="radio"
                  name="type-of-price"
                  id="fixed"
                  value="fixed"
                  onChange={(e) => setPriceType(e.target.value)}
                  className="checkbox"
                />
                <label
                  className="ml-3 text-xl text-primary-blue font-normal"
                  htmlFor="fixed"
                >
                  Fixed- $9.99
                </label>
              </div>
            </div>
          </div>

          {/************************Minimum and Maximum Capital*************************/}

          <div className="border-l border-ternary-blue">
            <div className="flex space-x-5 mb-3 mx-10">
              <span className="text-lg font-medium text-primary-blue">
                Min Capital:
              </span>
              <div className="flex items-center space-x-1 border-b border-ternary-blue w-[100px] px-2 text-lg text-primary-blue font-medium">
                <p>$</p>
                <input
                  type="number"
                  id="min-capital"
                  className="w-[80px] text-lg text-primary-blue font-medium focus:outline-none"
                  value={investments.minCapital}
                  onChange={(e) =>
                    setInvestments({
                      ...investments,
                      minCapital: e.target.value,
                    })
                  }
                  onBlur={() =>
                    checkAmountAllowed(investments.minCapital, "min-capital")
                  }
                />
              </div>
            </div>
            <div className="flex space-x-5 mx-10">
              <span className="text-lg font-medium text-primary-blue">
                Max Capital:
              </span>
              <div className="flex items-center space-x-1 border-b border-ternary-blue w-[100px] px-2 text-lg text-primary-blue font-medium">
                <p>$</p>
                <input
                  type="number"
                  id="max-capital"
                  className="w-[80px] text-lg text-primary-blue font-medium focus:outline-none "
                  value={investments.maxCapital}
                  onChange={(e) =>
                    setInvestments({
                      ...investments,
                      maxCapital: e.target.value,
                    })
                  }
                  onBlur={() =>
                    checkAmountAllowed(investments.maxCapital, "max-capital")
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <PointerTab
          tabLabels={[
            {
              label: TabLabel.PastPerformance
            },
            {
              label: TabLabel.SalesHistory
            },
          ]}
          selTabLabel={selTabLabel}
          onClickTab={clickTabLabel}
        />
      </div>
      {selTabLabel === TabLabel.PastPerformance && (
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
      {selTabLabel === TabLabel.PastPerformance && (
        <div className="mt-10">{currentLabel === "returns" && <Returns />}</div>
      )}
    </div>
  );
};

export default MirrorCryptoTrades;
