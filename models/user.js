const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "Please provide your first name."],
  },
  last_name: {
    type: String,
    required: [true, "Please provide your last name."],
  },
  gender: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: true,
  },
  confirm_password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", userSchema);
