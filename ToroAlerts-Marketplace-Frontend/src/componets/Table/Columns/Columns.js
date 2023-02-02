import ViewMore from "../../../assets/SVG/view-more";
import { useNavigate } from "react-router-dom";

export const algorithmColumns = [
  {
    Header: "Algorithm",
    accessor: "code",
  },
  {
    Header: "30-days",
    accessor: "days_30",
  },
  {
    Header: "90-days",
    accessor: "days_90",
  },
  {
    Header: "1-year",
    accessor: "year_1",
  },
  {
    Header: "3-years",
    accessor: "year_3",
  },
  {
    Header: "5-years",
    accessor: "year_5",
  },

  {
    Header: "View",
    accessor: "view",
    Cell: ({ row }) => {
      const code = row.original.code;
      const navigate = useNavigate();
      const handleClick = (code) => {
        console.log("code", code);
        navigate(`/marketplace/algorithm-details/backtesting-report/${code}`);
      };

      return (
        <ViewMore
          onClick={() => {
            handleClick(code);
          }}
          className="mx-auto w-5 h-5 cursor-pointer"
        />
      );
    },
  },
];

export const findMirroredTradeColumns = [
  {
    Header: "Mirror Id",
    accessor: "code",
  },
  {
    Header: "30-days",
    accessor: "days_30",
  },

  {
    Header: "1-year",
    accessor: "year_1",
  },
  {
    Header: "3-years",
    accessor: "year_3",
  },

  {
    Header: "View",
    accessor: "view",
    Cell: ({ row }) => {
      const code = row.original.code;
      const navigate = useNavigate();
      const handleClick = (code) => {
        console.log("code", code);
        navigate(`/marketplace/algorithm-details/backtesting-report/${code}`);
      };

      return (
        <ViewMore
          onClick={() => {
            handleClick(code);
          }}
          className="mx-auto w-5 h-5 cursor-pointer"
        />
      );
    },
  },
];

export const tradingHistoryColumns = [
  {
    Header: "Symbol",
    accessor: "ticker",
  },
  { Header: "Buy Date", accessor: "buyDate" },
  { Header: "Buy Price", accessor: "buyPrice" },
  { Header: "Sell Date", accessor: "sellDate" },
  { Header: "Sell Price", accessor: "sellPrice" },
  { Header: "Gains", accessor: "gains" },
  { Header: "Amount Invested", accessor: "amountInvested" },
];

export const salesHistoryColumns = [
  { Header: "Date", accessor: "date" },
  { Header: "No, of Buys", accessor: "noOfBuys" },
  { Header: "Revenue", accessor: "revenue" },
];

export const listedStocksColumns = [
  { Header: "Asset Allocation (%)", accessor: "assetAllocationPercentage" },
  { Header: "Listed Stocks", accessor: "tickerId" },
];
