const CustomError = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }

  try {
    const { userId, role } = await isTokenValid({ token });
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
};

const authorizePermission = (...role) => {
  console.log(role);
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "AuthorizedError routes not found"
      );
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermission,
};
