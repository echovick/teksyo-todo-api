const express = require("express");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const apiRoutes = require("./routes/api.route.js");
const connectToDatabase = require("./utils/connectToDatabase.js");
var cors = require("cors");
const bodyParser = require("body-parser");

// Connect to the database
connectToDatabase();

// Initialise the app
const app = express();

/**
 * Middlewares
 */
app.use(express.json()); // Body Parser, allows a post body to be added to the request object
app.use(express.urlencoded({ extended: false }));
app.use(helmet()); // Set security http headers
app.use(mongoSanitize()); // Data sanitization against NoSQL query injection
app.use(bodyParser.json());
app.use(cors());

// Replace with your environment-specific secret key
const JWT_SECRET = process.env.JWT_SECRET;

// routes
app.use("/api", apiRoutes);

module.exports = app;
