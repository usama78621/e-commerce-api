const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
  createJWT,
  isValidToken,
  attachCookiesToRosponse,
} = require("../utils");

const register = async (req, res) => {
  const { email } = req.body;
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email Already Exists");
  }
  const user = await User.create(req.body);
  const tokenUser = { userId: user._id, role: user.role };
  attachCookiesToRosponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ user:tokenUser });
};

const login = (req, res) => {
  res.send("login routes");
};
const logout = (req, res) => {
  res.send("Logout routes");
};

module.exports = { register, login, logout };
