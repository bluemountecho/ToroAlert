const { CustomError } = require("../utils/error-handlers");

const triggerSchemaValidator = (triggerObject) => {
  return new Promise((res, rej) => {
    triggerObject.validate((err) => {
      if (err) {
        return rej(new CustomError(err.message));
      }
      res();
    });
  });
};

module.exports = { triggerSchemaValidator };
