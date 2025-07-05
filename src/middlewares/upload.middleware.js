const multer = require("multer");
const config = require("../config");

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: config.MAX_FILE_SIZE,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

module.exports = { upload };
