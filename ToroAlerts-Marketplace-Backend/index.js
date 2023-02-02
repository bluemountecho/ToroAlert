const express = require("express");
const app = express();
const cors = require("cors");

// ***** cors ***** //
app.use(cors());

// ***** configrations requirements ***** //
require("dotenv").config();
require("./api/config/mongoose");

// ***** request parsers ***** //
app.use(express.json({ limit: "3mb", extended: true }));
app.use(express.urlencoded({ extended: true }));
// ***** api routes ***** //

app.use("/api", require("./api/routes"));
app.use("/admin", require("./admin/routes"));

app.use("/*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not Found",
  });
});

// ***** cron jobs for backtest ***** //
const backTestCheck = require('./backtest');

//ff code will changes in prod
app.use((err, req, res, next) => {
  if (err) {
    console.error(err, "catched in main");
    res.status(500).json({
      success: "false",
      message: err.code || "BAD REQUEST",
    });
  } else {
    next();
  }
});

// Call the backtesting function
backTestCheck.initCheckBacktests();

const port = process.env.PORT || 5000;

app.listen(port, function (err) {
  if (err) {
    console.log(`error in listening: ${err}`);
  }
  console.log(
    "Server Up and Running at:",
    `http://localhost:${port}`
  );
});
