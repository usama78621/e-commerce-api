const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users });
};
const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new CustomError.BadRequestError(
      `user not found this ${req.params.id} `
    );
  }
  res.status(StatusCodes.OK).json({ user });
};

const updateUser = (req, res) => {
  res.send("update user");
};

const showCurrentUser = (req, res) => {
  res.send("Show Current User");
};

const updateUserPassword = (req, res) => {
  res.send("Update user Password");
};

module.exports = {
  getAllUsers,
  getSingleUser,
  updateUser,
  showCurrentUser,
  updateUserPassword,
};
