const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const getSignUpForm = async (req, res, next) => {
  res.send("Retrieve Sign Up Form");
};

const createNewUser = async (req, res, next) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: { fullName: `${user.first_name} ${user.last_name}` },
    token,
  });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Provide your email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Input. Try again!");
  }

  const isCorrectPassword = await user.comparePassword(password);
  if (!isCorrectPassword) {
    throw new UnauthenticatedError("Invalid Input. Try again!");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: { fullName: `${user.first_name} ${user.last_name}` },
    token,
  });
};

module.exports = {
  getSignUpForm,
  createNewUser,
  loginUser,
};
