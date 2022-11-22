const { StatusCodes } = require("http-status-codes");
const CustomApiError = require("./custom-api");

class UnauthorizedError extends CustomApiError {
  constructor(massege) {
    super(massege);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = UnauthorizedError;
