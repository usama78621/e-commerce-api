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

const updateUser = async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    throw new CustomError.BadRequestError("Please provide all values");
  }
  const user = await User.findByIdAndUpdate(
    { _id: req.user.userId },
    req.body,
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId }).select("-password");
  if (!user) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
  res.status(StatusCodes.OK).json({ user });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError("Please provide both values");
  }
  const user = await User.findOne({ _id: req.user.userId });

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  user.password = newPassword;
  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Success! password update" });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  updateUser,
  showCurrentUser,
  updateUserPassword,
};
