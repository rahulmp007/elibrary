const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const config = require("./config");
const { connectDatabase } = require("./config/database");
const routes = require("./routes");
const {
  errorHandler,
  notFoundHandler,
} = require("./middlewares/error.middleware");
const { languageMiddleware } = require("./middlewares/language.middleware");
const logger = require("./utils/logger");

const app = express();

// Connect to database
connectDatabase();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    error: {
      message: "Too many requests from this IP, please try again later",
      status: 429,
    },
  },
});
app.use(limiter);

// Logging
if (config.NODE_ENV !== "test") {
  app.use(
    morgan("combined", {
      stream: { write: (message) => logger.info(message.trim()) },
    })
  );
}

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Language middleware - ADDED for multilingual support
app.use(languageMiddleware);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.use(languageMiddleware);
// API routes
app.use("/api/v1", routes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
