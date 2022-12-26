const { CustomAPIError } = require("../errors/customError");
const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (error, req, res, next) => {
  if (error instanceof CustomAPIError) {
    return res.status(error.statusCode).json({ msg: err.message });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
};

module.exports = errorHandlerMiddleware;
