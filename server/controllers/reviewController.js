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

  let review = await Review.findOne({ author: req.user._id, product: id });

  if (review) {
    return next(
      new ErrorHandler(400, "You have already given a review on this product")
    );
  }

  if (!rating) {
    return next(new ErrorHandler(400, "Please give rating for review product"));
  }

  const author = req.user._id;

  review = await Review.create({ rating, comment, author, product: id });

  product.numOfReview += 1;
  product.reviews.push(review._id);

  // const result = await Review.aggregate([
  //   { $group: { _id: { product: id }, avgRating: { $avg: "$rating" } } },
  // ]);

  Review.find({ product: id }).exec(async (err, docs) => {
    if (err) return next(new ErrorHandler(500, err));

    Review.aggregate([
      {
        $match: { _id: { $in: docs.map((doc) => doc._id) } },
      },
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" },
        },
      },
    ]).exec(async (err, result) => {
      if (err) return next(new ErrorHandler(500, err));
      const avgRating = Math.round(result[0].avgRating * 2) / 2;
      product.ratings = avgRating;
      await product.save();

      res.status(201).json({
        success: true,
        review,
        product,
      });
    });
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

  // if (review.author.toString() !== req.user._id.toString()) {
  //   return next(new ErrorHandler(401, "You can only update your review."));
  // }

  if (!review.author.equals(req.user._id)) {
    return next(new ErrorHandler(401, "You can only update your review."));
  }

  review = await Review.findByIdAndUpdate(reviewId, req.body, { new: true });

  Review.find({ product: id }).exec(async (err, docs) => {
    if (err) return next(new ErrorHandler(500, err));

    Review.aggregate([
      {
        $match: { _id: { $in: docs.map((doc) => doc._id) } },
      },
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" },
        },
      },
    ]).exec(async (err, result) => {
      if (err) return next(new ErrorHandler(500, err));
      const avgRating = Math.round(result[0].avgRating * 2) / 2;
      product.ratings = avgRating;
      await product.save();

      res.status(201).json({
        success: true,
        product,
        review,
      });
    });
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

  Review.find({ product: id }).exec(async (err, docs) => {
    if (err) return next(new ErrorHandler(500, err));

    Review.aggregate([
      {
        $match: { _id: { $in: docs.map((doc) => doc._id) } },
      },
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" },
        },
      },
    ]).exec(async (err, result) => {
      if (err) return next(new ErrorHandler(500, err));
      if (product.numOfReview > 0) {
        product.numOfReview -= 1;
      }

      if (result.length === 0) {
        product.ratings = 0;
      } else {
        const avgRating = Math.round(result[0].avgRating * 2) / 2;
        product.ratings = avgRating;
      }

      await product.save();

      res.status(201).json({
        success: true,
        product,
      });
    });
  });
});

module.exports = { createReview, updateReview, deleteReview };
