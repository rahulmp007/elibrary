const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Library name is required"],
      trim: true,
      maxlength: [200, "Name cannot exceed 200 characters"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
      maxlength: [500, "Address cannot exceed 500 characters"],
    },
    phone: {
      type: String,
      trim: true,
      match: [/^\+?[\d\s-()]+$/, "Please enter a valid phone number"],
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    operatingHours: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
librarySchema.index({ name: 1 });
librarySchema.index({ isActive: 1 });

const Library = mongoose.model("Library", librarySchema);
module.exports = Library;
