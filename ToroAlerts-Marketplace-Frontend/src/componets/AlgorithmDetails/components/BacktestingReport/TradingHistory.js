import React from "react";
import Table from "../../../Table/Table";
import { tradingHistoryColumns } from "../../../Table/Columns/Columns";

const TradingHistory = ({ tradingHistoryData }) => {
  return (
    <div>
      {tradingHistoryData.length === 0 && (
        <h2 className="text-left text-xl text-ternary-blue font-normal">
          No Algorithms Present
        </h2>
      )}
      {tradingHistoryData.length > 0 && (
        <Table tableData={tradingHistoryData} COLUMNS={tradingHistoryColumns} />
      )}
    </div>
  );
};

export default TradingHistory;
