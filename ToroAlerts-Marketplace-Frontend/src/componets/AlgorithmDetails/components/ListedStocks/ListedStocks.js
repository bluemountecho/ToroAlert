import React from "react";
import Table from "../../../Table/Table";
import { listedStocksColumns } from "../../../Table/Columns/Columns";

const ListedStocks = ({ tableData }) => {
  return (
    <div>
      <Table tableData={tableData} COLUMNS={listedStocksColumns} />
    </div>
  );
};

export default ListedStocks;
