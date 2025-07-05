const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
      maxlength: [300, "Title cannot exceed 300 characters"],
    },
    isbn: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      match: [/^(?:\d{9}[\dX]|\d{13})$/, "Please enter a valid ISBN"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    genre: {
      type: String,
      trim: true,
      maxlength: [100, "Genre cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    publishedYear: {
      type: Number,
      min: [1000, "Published year must be valid"],
      max: [new Date().getFullYear(), "Published year cannot be in the future"],
    },
    pages: {
      type: Number,
      min: [1, "Pages must be positive"],
    },
    language: {
      type: String,
      default: "English",
      trim: true,
    },
    image: {
      type: String,
      default: null,
    },
    library: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Library",
      required: [true, "Library is required"],
    },
    borrower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    borrowedAt: {
      type: Date,
      default: null,
    },
    dueDate: {
      type: Date,
      default: null,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    borrowingCharge: {
      type: Number,
      default: 0,
      min: [0, "Borrowing charge cannot be negative"],
    },
    condition: {
      type: String,
      enum: ["Excellent", "Good", "Fair", "Poor"],
      default: "Good",
    },
  },
  {
    timestamps: true,
  },
);

// Indexes for better query performance
bookSchema.index({ title: "text", genre: "text", description: "text" });
bookSchema.index({ library: 1, isAvailable: 1 });
bookSchema.index({ author: 1 });
bookSchema.index({ borrower: 1 });
bookSchema.index({ isbn: 1 });


const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
