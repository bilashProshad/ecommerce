const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: [true, "Please give rating"],
      minLength: [1, "Rating should have more than 1 star"],
      maxLength: [5, "Rating cannot exceed 5 stars"],
    },
    comment: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Review", reviewSchema);
