// const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (error, req, res, next) => {
  let customError = {
    // Set default
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: error.message || "Something went wrong. Try again later!",
  };

  // if (error instanceof CustomAPIError) {
  //   return res.status(error.statusCode).json({ msg: error.message });
  // }

  if (error.name === "ValidationError") {
    customError.msg = Object.values(error.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = 400;
  }

  if (error.code && error.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      error.keyValue
    )} field, please enter another email.`;
    customError.statusCode = 400;
  }

  // Checking for Cast Error
  if (error.name === "CastError") {
    customError.msg = `No item found with id : ${error.value}`;
    customError.statusCode = 404;
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
