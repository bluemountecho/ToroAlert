class CustomError {
  constructor(message, status, log) {
    this.type = "custom_err";
    this.message = message;
    this.status = status;
    if (log) {
      console.error(message);
    }
  }
}

module.exports = { CustomError };
