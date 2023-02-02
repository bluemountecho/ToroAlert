import React from "react";
//import Cancel from "../../../SVG/cancel";
//import Search from "../../../SVG/search";

const GlobalFilter = ({ filter = "", setFilter }) => {
  return (
    <div
      className={`w-80 border-2 rounded-md bg-white flex items-center space-x-2 px-2 py-2 ${
        filter === "" ? "border-gray-200" : "border-blue-button"
      }`}
    >
      {/* <Search
        className={`h-5 w-5 ${
          filter === "" ? "text-gray-400" : "text-blue-button"
        } `}
      /> */}
      <input
        className="w-full focus:outline-none bg-transparent"
        id="searchbar"
        placeholder="Search"
        autoComplete="off"
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      {/* {filter !== "" && (
        <Cancel
          onClick={() => setFilter("")}
          className="text-blue-button hover:text-blue-buttonDark h-5 w-5 self-end cursor-pointer"
        />
      )} */}
    </div>
  );
};

export default GlobalFilter;
