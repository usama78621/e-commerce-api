class CustomApiError extends Error {
  constructor(massege) {
    super(massege);
  }
}

module.exports = CustomApiError;
