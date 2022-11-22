const CustomApi = require("../errors");

const checkPermission = (requsetUser, requsetUserId) => {
  if (requsetUser.role === "admin") return;
  if (requsetUser.userId === requsetUserId.toString()) return;
  throw new CustomApi.UnauthorizedError("Not authorized this routes");
};

module.exports = checkPermission;
