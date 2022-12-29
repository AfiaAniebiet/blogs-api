const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");
require("dotenv").config();

const auth = async (req, res, next) => {
  // Check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Invalid authentication");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user to the blog route
    req.user = { userId: payload.userId, fullName: payload.fullName };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Invalid authentication");
  }
};

module.exports = auth;
