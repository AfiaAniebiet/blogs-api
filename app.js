// Importing and creating express application
const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");

// Importing custom files
const MONGODB_CONNECTION = require("./db/connect");
const userRoute = require("./routes/user");

// middleware
app.use(express.json);
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/blogs-api/user", userRoute);

const PORT = process.env.PORT || 3000;

// Connecting to database and starting the server
const start = async () => {
  try {
    // MongoDB URI
    MONGODB_CONNECTION(process.env.MONGODB_URI);
    app.listen(PORT, () => console.log(`Starting server port: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
start();
