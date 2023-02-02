const extractBearerAuthorizationToken = (req) => {
  try {
    const token =
      req.headers.authorization.split(" ")[0].toLowerCase() == "bearer"
        ? req.headers.authorization.split(" ")[1]
        : null;
    if (token) {
      return token;
    } else {
      throw new Error("No token");
    }
  } catch {
    return null;
  }
};

module.exports = { extractBearerAuthorizationToken };
