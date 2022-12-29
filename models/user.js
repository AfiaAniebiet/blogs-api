const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "Please provide your first name."],
    minLength: 2,
    maxLength: 30,
  },
  last_name: {
    type: String,
    required: [true, "Please provide your last name."],
    minLength: 2,
    maxLength: 30,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  email: {
    type: String,
    required: [true, "Please provide a valid email"],
    unique: [true, "Email already exists"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Mongoose middleware to hash password - version 1
/**
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
**/

// Mongoose middleware to hash password - version 2
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

// Generate token using instance method
userSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      userId: this._id,
      first_name: this.first_name,
      last_name: this.last_name,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_DURATION }
  );
};

// Check entered password to stored password at login
userSchema.methods.comparePassword = async function (enteredPassword) {
  const isMatch = bcrypt.compare(enteredPassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", userSchema);
