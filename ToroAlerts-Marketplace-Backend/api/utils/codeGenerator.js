const { customAlphabet } = require("nanoid");

const generateAlgorithmCode = (length, prefix) => {
  const alphabet =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  return prefix.toString() + customAlphabet(alphabet, length)();
};

module.exports = { generateAlgorithmCode };
