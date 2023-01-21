const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Product = require("../models/Product");
const Review = require("../models/Review");
const ErrorHandler = require("../utils/ErrorHandler");

const createReview = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  const product = await Product.findById(id);
  if (!product) {
    return next(new ErrorHandler(404, "Product not found."));
  }

  if (!rating) {
    return next(new ErrorHandler(400, "Please give rating for review product"));
  }

  const author = req.user._id;

  const review = await Review.create({ rating, comment, author });

  const result = await Review.aggregate(
    [
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" },
        },
      },
    ],
    function (err, result) {
      if (err) return next(new ErrorHandler(500, "Internal server error"));
    }
  );

  const avgRating = Math.round(result[0].avgRating * 2) / 2;

  product.numOfReview += 1;
  product.reviews.push(review._id);
  product.ratings = avgRating;

  await product.save();

  res.status(201).json({
    success: true,
    review,
    product,
  });
});

const updateReview = catchAsyncError(async (req, res, next) => {
  const { id, reviewId } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    return next(new ErrorHandler(404, "Product not found."));
  }

  let review = await Review.findById(reviewId);
  if (!review) {
    return next(new ErrorHandler(404, "Review not found."));
  }

  console.log(review.author);
  console.log(req.user._id);

  // if (review.author.toString() !== req.user._id.toString()) {
  //   return next(new ErrorHandler(401, "You can only update your review."));
  // }

  if (!review.author.equals(req.user._id)) {
    return next(new ErrorHandler(401, "You can only update your review."));
  }

  review = await Review.findByIdAndUpdate(reviewId, req.body, { new: true });

  const result = await Review.aggregate(
    [
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" },
        },
      },
    ],
    function (err, result) {
      if (err) return next(new ErrorHandler(500, "Internal server error"));
    }
  );

  const avgRating = Math.round(result[0].avgRating * 2) / 2;

  product.ratings = avgRating;

  await product.save();

  res.status(201).json({
    success: true,
    product,
    review,
  });
});

const deleteReview = catchAsyncError(async (req, res, next) => {
  const { id, reviewId } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    return next(new ErrorHandler(404, "Product not found."));
  }

  let review = await Review.findById(reviewId);
  if (!review) {
    return next(new ErrorHandler(404, "Review not found."));
  }

  if (!review.author.equals(req.user._id)) {
    return next(new ErrorHandler(401, "You can only update your review."));
  }

  product.reviews.pop(reviewId);

  await review.remove();

  const result = await Review.aggregate(
    [
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" },
        },
      },
    ],
    function (err, result) {
      if (err) return next(new ErrorHandler(500, "Internal server error"));
    }
  );

  const avgRating = Math.round(result[0].avgRating * 2) / 2;

  product.ratings = avgRating;

  await product.save();

  res.status(201).json({
    success: true,
    product,
  });
});

module.exports = { createReview, updateReview, deleteReview };
