const multer = require("multer");
const config = require("../config");
const logger = require("../utils/logger");

// File type validation using magic numbers (file signatures)
const validateFileSignature = (buffer, mimetype) => {
  const signatures = {
    "image/jpeg": [[0xff, 0xd8, 0xff]],
    "image/png": [[0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]],
    "image/webp": [
      [0x52, 0x49, 0x46, 0x46], // RIFF
    ],
  };

  const fileSignatures = signatures[mimetype];
  if (!fileSignatures) return false;

  return fileSignatures.some((signature) => {
    return signature.every((byte, index) => buffer[index] === byte);
  });
};

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: config.MAX_FILE_SIZE,
    files: 1, // Only one file at a time
    fields: 10, // Limit number of fields
  },
  fileFilter: (req, file, cb) => {
    try {
      // Check MIME type
      const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedMimeTypes.includes(file.mimetype)) {
        logger.warn("File upload rejected: Invalid MIME type", {
          mimetype: file.mimetype,
          originalname: file.originalname,
          userId: req.user?._id,
        });
        return cb(
          new Error("Only JPEG, PNG, and WebP images are allowed"),
          false
        );
      }

      const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];
      const fileExtension = file.originalname
        .toLowerCase()
        .substring(file.originalname.lastIndexOf("."));
      if (!allowedExtensions.includes(fileExtension)) {
        logger.warn("File upload rejected: Invalid file extension", {
          extension: fileExtension,
          originalname: file.originalname,
          userId: req.user?._id,
        });
        return cb(new Error("Invalid file extension"), false);
      }

      cb(null, true);
    } catch (error) {
      logger.error("File filter error", { error: error.message });
      cb(new Error("File validation failed"), false);
    }
  },
});

const validateFileContent = (req, res, next) => {
  if (req.file) {
    try {
      const isValidSignature = validateFileSignature(
        req.file.buffer,
        req.file.mimetype
      );

      if (!isValidSignature) {
        logger.warn("File upload rejected: Invalid file signature", {
          mimetype: req.file.mimetype,
          originalname: req.file.originalname,
          userId: req.user?._id,
        });
        return res.status(400).json({
          success: false,
          message: "File content does not match the declared type",
        });
      }

      logger.info("File upload validated successfully", {
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        userId: req.user?._id,
      });
    } catch (error) {
      logger.error("File content validation error", {
        error: error.message,
        userId: req.user?._id,
      });
      return res.status(500).json({
        success: false,
        message: "File validation failed",
      });
    }
  }

  next();
};

module.exports = { upload, validateFileContent };
