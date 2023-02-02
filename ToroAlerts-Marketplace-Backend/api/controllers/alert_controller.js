const { sanitize } = require("../utils/data-handlers");

const getAlertsOnAlgorithms = async (req, res) => {
  try {
    const algorithmCode = sanitize(req.body.algorithmCode);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message:
        err.type === "custom_err" ? err.message : "Failed to delete algorithm",
    });
  }
};

module.exports = { getAlertsOnAlgorithms };
