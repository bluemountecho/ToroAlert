import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../componets/Button/Button";

import LoadingSpinner from "../../../componets/Spinners/LoadingSpinner/LoadingSpinner";
import LeaseMirrorTrades from "./components/LeaseMirrorTrades/LeaseMirrorTrades";
import MyMirrorTrades from "./components/MyMirrorTrades/MyMirrorTrades";

const MarketPlace = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [isLoading]);

  return (
    <div>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <div className="max-w-screen px-20 py-14">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-5">
              <Button
                innerText="My Mirror Trades"
                type="text"
                extraClass={
                  type === "my-mirror-trades"
                    ? "text-2xl bg-ternary-blue text-primary-blue font-medium"
                    : "text-2xl bg-white text-secondary-blue font-normal px-0 xl:px-0"
                }
                onClick={() => {
                  navigate("/marketplace/my-mirror-trades/configured-platform");
                }}
              />
              <Button
                innerText="Lease Mirror Trades"
                type="text"
                extraClass={
                  type === "lease-mirror-trades"
                    ? "text-2xl bg-ternary-blue text-primary-blue font-medium"
                    : "text-2xl bg-white text-secondary-blue font-normal px-0 xl:px-0"
                }
                onClick={() => {
                  navigate(
                    "/marketplace/lease-mirror-trades/top-performing-strategies"
                  );
                }}
              />
            </div>
            {/* <div className="flex items-center space-x-10">
              <Button
                innerText="Mirror my Trades"
                type="text"
                extraClass="text-md xl:text-lg font-medium text-primary-blue-lt bg-white border border-primary-yellow"
              />
              <Button
                onClick={() => navigate("/marketplace/build-my-algorithm")}
                innerText="Build my Algorithm"
                type="text"
                extraClass="text-md xl:text-lg font-medium text-primary-blue-lt bg-primary-yellow border border-primary-yellow"
              />
            </div> */}
          </div>

          <div className="mt-10">
            {type === "my-mirror-trades" && <MyMirrorTrades />}
            {type === "lease-mirror-trades" && <LeaseMirrorTrades />}
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketPlace;
