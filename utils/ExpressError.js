class ExpressError extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message; // fix this line
    this.statusCode = statusCode; // and fix this line
  }
}

module.exports = ExpressError;
