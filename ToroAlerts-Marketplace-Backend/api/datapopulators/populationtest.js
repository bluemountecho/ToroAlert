// const fs = require("fs");
// const path = require("path");
// const readline = require("readline");
// const mfModel = require("../models/mutualFund");
// const StocksModel = require("../models/stocks");
// const mfData = [];
// const stocksData = [];
// const pathToF = path.join(__dirname, "Stocks.txt");
// const inputStream = fs.createReadStream(pathToF);
// const rl = readline.createInterface({
//   input: inputStream,
//   crlfDelay: Infinity,
// });

// rl.on("line", (line, i) => {
//   const [ticker, name] = line
//     .trim()
//     .split("\t")
//     .map((val) => val.trim());
//   stocksData.push({ ticker, fullName: name, description: "Test data" });
// });
// rl.on("close", () => {
//   let newlimit = 285;
//   const stc = [];
//   let sx = 0;
//   const sectors = [
//     "basic-materials",
//     "financial-services",
//     "consumer-defensive",
//     "energy",
//     "consumer-cyclical",
//     "real-estates",
//     "healthcare",
//     "technology",
//     "utilities",
//     "industrials",
//     "communication-services",
//   ];
//   stocksData.forEach((val, i) => {
//     stc.push({ sector: sectors[sx % sectors.length], ...val });
//     if (i >= newlimit) {
//       newlimit += 285;
//       sx++;
//     }
//   });

//   StocksModel.insertMany(stc, (err, data) => {
//     console.log(err, data);
//   });
// });
// // rl.on("close", () => {
// //   // console.log(mfData);
// //   const dbIn = mfData.map((val) => ({
// //     ticker: val,
// //     name: "Vanguard Total Stock Market Index Fund Institutional Shares",
// //     description: "This is test data",
// //     returns: [
// //       { period: "30 Days", value: "10%" },
// //       { period: "52 Weeks", value: "13.3%" },
// //       { period: "1 Yr", value: "10%" },
// //       { period: "3 Yr", value: "20%" },
// //       { period: "5 Yr", value: "30%" },
// //     ],
// //     sectorWeightings: [
// //       {
// //         sectorName: "Basic Materials",
// //         sharePercentage: 89.5,
// //       },
// //       {
// //         sectorName: "Consumer Cyclical",
// //         sharePercentage: 79.5,
// //       },
// //       {
// //         sectorName: "Financial Services",
// //         sharePercentage: 69.5,
// //       },
// //       {
// //         sectorName: "Real Estate",
// //         sharePercentage: 59.5,
// //       },
// //       {
// //         sectorName: "Consumer Defensive",
// //         sharePercentage: 49.5,
// //       },
// //       {
// //         sectorName: "Healthcare",
// //         sharePercentage: 89.5,
// //       },
// //       {
// //         sectorName: "Utilities",
// //         sharePercentage: 89.5,
// //       },
// //       {
// //         sectorName: "Communication Services",
// //         sharePercentage: 59.5,
// //       },
// //       {
// //         sectorName: "Energy",
// //         sharePercentage: 29.5,
// //       },
// //       {
// //         sectorName: "Industries",
// //         sharePercentage: 89.5,
// //       },
// //       {
// //         sectorName: "Technology",
// //         sharePercentage: 99.5,
// //       },
// //     ],
// //     algorithmsMatched: [
// //       "6248825c1b0d28ad718be32a",
// //       "6248825d1b0d28ad718be6ac",
// //       "6248825e1b0d28ad718bea67",
// //       "624882601b0d28ad718befe7",
// //     ],
// //   }));
// //   // console.log(dbIn);
// //   mfModel.insertMany(dbIn, (err, data) => {
// //     console.log(err, data);
// //   });
// // });
