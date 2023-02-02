const mongoose = require("mongoose");
const url = require("./keys").DB_CONNECTION_URL;
try {
  mongoose.connect(url);
} catch {
  console.log("error in connecting to db");
}
const db = mongoose.connection;

db.on("error", function (err) {
  console.error(err);
  console.log("error in connecting to mongodb");
});

db.once("open", function () {
  console.log("connected to mongodb ");
});

module.exports = db;
