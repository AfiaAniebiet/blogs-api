const mongoose = require("mongoose");

const MONGODB_CONNECTION = (MONGODB_URI) => {
  mongoose.set("strictQuery", false);

  mongoose.connect(MONGODB_URI);

  mongoose.connection.on("connected", () => {
    console.log("Connected to database");
  });

  mongoose.connection.on("error", () => {
    console.log("Failed to connect to database");
    console.log(error);
  });
};

module.exports = MONGODB_CONNECTION;
