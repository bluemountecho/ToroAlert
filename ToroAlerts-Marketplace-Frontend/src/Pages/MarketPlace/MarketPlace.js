import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../componets/Button/Button";
import MyAlgorithms from "./components/MyAlgorithms/MyAlgorithms";
import LeaseAlgorithms from "./components/LeaseAlgorithms/LeaseAlgorithms";
import LoadingSpinner from "../../componets/Spinners/LoadingSpinner/LoadingSpinner";

const MarketPlace = ({ count, setCount }) => {
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
                innerText="My Algorithms"
                type="text"
                extraClass={
                  type === "my-algorithms"
                    ? "text-2xl bg-ternary-blue text-primary-blue font-medium"
                    : "text-2xl bg-white text-secondary-blue font-normal px-0 xl:px-0"
                }
                onClick={() => {
                  navigate("/marketplace/my-algorithms/build-algorithms");
                }}
              />
              <Button
                innerText="Lease Algorithms"
                type="text"
                extraClass={
                  type === "lease-algorithms"
                    ? "text-2xl bg-ternary-blue text-primary-blue font-medium"
                    : "text-2xl bg-white text-secondary-blue font-normal px-0 xl:px-0"
                }
                onClick={() => {
                  navigate(
                    "/marketplace/lease-algorithms/top-performing-strategies"
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
            {type === "my-algorithms" && (
              <MyAlgorithms count={count} setCount={setCount} />
            )}

            {type === "lease-algorithms" && <LeaseAlgorithms />}
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketPlace;
