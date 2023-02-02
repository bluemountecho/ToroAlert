import React, { useMemo } from "react";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import ChevronLeft from "../../assets/SVG/chevron-left";
import ChevronRight from "../../assets/SVG/chevron-right";
//import GlobalFilter from "./GlobalFilter/GlobalFilter";
//import classes from "./table.module.css";

const Table = ({ title, tableData, COLUMNS }) => {
  const columns = useMemo(() => COLUMNS, [COLUMNS]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns: columns,
      data: data,
      initialState: {
        pageSize: 10,
      },
    },
    useGlobalFilter,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    //setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
  } = tableInstance;

  // const { globalFilter, pageIndex } = state;
  // of {pageOptions.length}
  const { pageIndex } = state;

  //console.log(pageIndex, "pageIndex");

  return (
    <div className="max-w-max">
      {/* <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /> */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl text-primary-blue-lt font-medium">
          {title ? title : ""}
        </h1>
        <div className="flex items-center justify-end space-x-10  mr-1">
          <div className="flex items-center ">
            {pageOptions.length > 0 && (
              <span
                className={`text-center py-0.5 px-2.5  ${
                  pageIndex === 0
                    ? "bg-ternary-blue text-primary-blue-lt text-base"
                    : "bg-white text-lg text-ternary-blue"
                } rounded-full font-medium `}
              >
                1
              </span>
            )}
            {pageOptions.length > 1 && (
              <span
                className={`text-center py-0.5 px-2.5  ${
                  pageIndex === 1
                    ? "bg-ternary-blue text-primary-blue-lt text-base"
                    : "bg-white text-lg text-ternary-blue"
                } rounded-full font-medium `}
              >
                2
              </span>
            )}
            {pageOptions.length > 2 && (
              <span
                className={`text-center py-0.5 px-2.5  ${
                  pageIndex > 1
                    ? "bg-ternary-blue text-primary-blue-lt text-base"
                    : "bg-white text-lg text-ternary-blue"
                } rounded-full font-medium `}
              >
                {pageIndex > 1 ? pageIndex + 1 : 3}
              </span>
            )}
            {pageIndex < pageOptions.length - 1 && (
              <span className="text-lg text-ternary-blue">. . .</span>
            )}
          </div>
          <div className="flex items-center space-x-5">
            <button
              className="disabled:opacity-30 max-w-max rounded p-1 bg-ternary-blue cursor-pointer"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              <ChevronLeft />
            </button>
            <button
              className="disabled:opacity-30 max-w-max rounded p-1 bg-ternary-blue cursor-pointer"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
      <table
        {...getTableProps()}
        className="w-full -mt-[0.3px] border-collapse border-none"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th
                  className={
                    index === 0
                      ? " rounded-tl-lg bg-primary-blue-lt py-3 px-10 text-white text-xl font-semibold"
                      : index === headerGroup.headers.length - 1
                      ? "rounded-tr-lg border-r border-transparent bg-primary-blue-lt py-3 px-10 text-white text-xl font-semibold"
                      : "bg-primary-blue-lt py-3 px-10 text-white text-xl font-semibold"
                  }
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="text-center">
                {row.cells.map((cell, index) => {
                  //console.log(index, "index");

                  return (
                    <td
                      className="border-b border-r border-l-[0.5px] border-primary-blue-lt py-3 px-10  text-lg text-primary-blue-lt font-normal"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
