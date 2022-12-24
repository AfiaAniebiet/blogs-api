const User = require("../models/user");

const createNewUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createNewUser,
};
