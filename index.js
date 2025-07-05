// server.js or index.js
const app = require("./src/app");
const { connectDatabase } = require("./src/config/database");
const logger = require("./src/utils/logger");

const PORT = process.env.PORT || 3000;
let server;

// Connect to MongoDB and start server
(async () => {
  try {
    await connectDatabase();
    server = app.listen(PORT, () => {
      logger.info(
        `🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
      );
    });
  } catch (err) {
    logger.error("❌ Failed to connect to the database:", err);
    process.exit(1);
  }
})();

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  logger.error("🚨 Unhandled Promise Rejection:", err);
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  logger.error("🔥 Uncaught Exception:", err);
  process.exit(1);
});
