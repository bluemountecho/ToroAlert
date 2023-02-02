const { CustomError } = require("../../api/utils/error-handlers");
const { sanitize } = require("../../api/utils/data-handlers");
const AlertModel = require("../../api/models/alerts");
const AlgorithmModel = require("../../api/models/algorithm");
const versionAppendVal = 0.1;
const pushAlerts = async (req, res) => {
  try {
    const algorithmCode = sanitize(req.body.algorithmCode);
    const tickerId = sanitize(req.body.tickerId);
    const buyPrice = parseFloat(sanitize(req.body.buyPrice));
    const sellPrice = parseFloat(sanitize(req.body.sellPrice));
    const stopPrice = parseFloat(sanitize(req.body.stopPrice));
    const signalType = sanitize(req.body.signalType);
    const bearBullRating = parseFloat(sanitize(req.body.bearBullRating));

    const algorithm = await AlgorithmModel.updateBearBullRating(
      algorithmCode,
      bearBullRating
    );
    // console.log(algorithm);
    //preparing stockAlert object
    if (!algorithm.stocksInAlgorithm.includes(tickerId)) {
      throw new CustomError(
        "No stock present in this algo by this id, bearBull Rating Updated"
      );
    }
    const alertsOnStockObj = {
      tickerId,
      buyPrice,
      sellPrice,
      stopPrice,
      signalType,
    };

    const algoAlert = await AlertModel.findOne({ algorithmCode });
    // as of now i am assuming that there is only once source (data server ) to call this api so not doing it in update way as the db will only recieve consecutive call so no transaction or document locking issue
    if (!algoAlert) {
      const algoAlertObj = new AlertModel({
        algorithmCode,
        bearBullRating,
        algorithmObjectId: algorithm.algorithmObjectId,
        alertsOnStock: [{ alertVersionUpdatedAt: 1, ...alertsOnStockObj }],
      });
      await algoAlertObj.save();
    } else {
      const currentVersion = algoAlert.currentVersion + versionAppendVal;
      const isStockAlert = algoAlert.alertsOnStock.findIndex(
        (stock) => stock.tickerId === tickerId
      );
      if (isStockAlert === -1) {
        algoAlert.alertsOnStock.push({
          alertVersionUpdatedAt: currentVersion,
          ...alertsOnStockObj,
        });
      } else {
        algoAlert.alertsOnStock[isStockAlert] = {
          alertVersionUpdatedAt: currentVersion,
          ...alertsOnStockObj,
        };
      }
      algoAlert.currentVersion = currentVersion;
      algoAlert.bearBullRating = bearBullRating;
      await algoAlert.save();
    }
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message:
        err.type === "custom_err"
          ? err.message
          : "Failed to push alert, contact admin",
    });
  }
};

module.exports = { pushAlerts };
