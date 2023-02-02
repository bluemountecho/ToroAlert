import React from "react";
import Table from "../../../Table/Table";
import { salesHistoryColumns } from "../../../Table/Columns/Columns";
import { salesHistoryData } from "../../../Table/admin_response";

const SalesHistory = () => {
  return (
    <div>
      <div className="border border-ternary-blue-ltr px-32 py-2 max-w-max rounded-2xl">
        <h3 className="text-xl font-semibold text-primary-blue">
          Total number of views: 12.4K
        </h3>
      </div>
      <Table tableData={salesHistoryData} COLUMNS={salesHistoryColumns} />
    </div>
  );
};

export default SalesHistory;
