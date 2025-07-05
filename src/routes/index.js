const express = require("express");
const authRoutes = require("./auth.routes");
const bookRoutes = require("./book.routes");
const libraryRoutes = require("./library.routes");
const borrowRoutes = require("./borrow.routes");

const router = express.Router();

router.use("/users", authRoutes);
router.use("/books", bookRoutes);
router.use("/libraries", libraryRoutes);
router.use("/borrow", borrowRoutes);

module.exports = router;
