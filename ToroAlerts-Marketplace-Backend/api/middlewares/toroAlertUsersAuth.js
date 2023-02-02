const jwt = require("jsonwebtoken");
const { extractBearerAuthorizationToken } = require("./headersManipulators");
const jwtSecret = require("../config/keys").TOROALERT_JWT_SECRET;

const toroAlertUserJWTAuthenticator = (req, res, next) => {
  try {
    const bearerToken = extractBearerAuthorizationToken(req);
    if (!bearerToken) {
      throw new Error("No token");
    }
    const jwtPayload = jwt.verify(
      bearerToken,
      jwtSecret
    );
    req.user = jwtPayload;
    next();
  } catch (err) {
    res.status(403).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

module.exports = { toroAlertUserJWTAuthenticator };
