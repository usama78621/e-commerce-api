const { StatusCodes } = require("http-status-codes");
const CustomApiError = require("./custom-api");

class UnauthenticatedError extends CustomApiError {
  constructor(massege) {
    super(massege);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;
