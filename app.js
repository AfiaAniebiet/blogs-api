// Importing and creating express application
const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");
const bodyParser = require("body-parser");

// Extra Security Packages
const helmet = require("helmet");
const cors = require("cors");
const xssClean = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000, //15 minutes
  max: 100, //limits each IP to 100 requests per 'window' (here, per 15 minutes)
  standardHeaders: true, //Return rate limit info in the 'Rate Limit' headers
  legacyHeaders: false, // Disable the X-RateLimit headers
});

// Swagger
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

// Importing custom files
const MONGODB_CONNECTION = require("./db/connect");
//const authUser = require("./middleware/authentication");
const authRoute = require("./routes/auth");
const blogsRoute = require("./routes/blogs");

// Error Handling
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/errorHandler");

// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(xssClean());

app.set("trust proxy", 1);
app.use(limiter);

app.get("/", (req, res) => {
  res.send("<h1>Blogs API</h1><a href='/api-docs'>Documentation</a>");
});

// Middleware for the swagger document
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Routes
app.use("/blogs-api/auth", authRoute);
app.use("/blogs-api/blogs", blogsRoute);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 8000;

// Connecting to database and starting the server
const startServer = async () => {
  try {
    // MongoDB URI
    await MONGODB_CONNECTION(process.env.MONGODB_URI);
    app.listen(PORT, () => console.log(`Starting server port: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
startServer();

module.exports = app;
