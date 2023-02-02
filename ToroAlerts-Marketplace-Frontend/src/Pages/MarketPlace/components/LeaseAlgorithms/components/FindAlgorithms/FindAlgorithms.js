import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../../../../componets/Button/Button";
import MatchMutualFund from "./component/MatchMutualFund/MatchMutualFund";
import OtherAlgos from "./component/OtherAlgos/OtherAlgos";

const FindAlgorithms = () => {
  const navigate = useNavigate();
  const { searchType } = useParams();

  return (
    <div className="mt-10">
      <div className="flex items-center space-x-5">
        <Button
          innerText="Match a Mutual Fund"
          type="text"
          extraClass={
            searchType === "match-a-mutual-fund"
              ? "text-2xl bg-ternary-blue text-primary-blue font-medium"
              : "text-2xl bg-white text-secondary-blue font-normal px-0 xl:px-0"
          }
          onClick={() => {
            navigate(
              "/marketplace/lease-algorithms/find-algorithms/match-a-mutual-fund"
            );
          }}
        />
        <Button
          innerText="Other Algos"
          type="text"
          extraClass={
            searchType === "other-algorithms"
              ? "text-2xl bg-ternary-blue text-primary-blue font-medium"
              : "text-2xl bg-white text-secondary-blue font-normal px-0 xl:px-0"
          }
          onClick={() => {
            navigate(
              "/marketplace/lease-algorithms/find-algorithms/other-algorithms"
            );
          }}
        />
      </div>
      <div>
        {searchType === "match-a-mutual-fund" && <MatchMutualFund />}
        {searchType === "other-algorithms" && <OtherAlgos />}
      </div>
    </div>
  );
};

export default FindAlgorithms;
