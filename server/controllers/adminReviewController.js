const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Product = require("../models/Product");
const Review = require("../models/Review");
const ErrorHandler = require("../utils/ErrorHandler");

exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler(404, "No product found"));
  }

  const reviews = await Review.find({ product: req.params.id }).populate(
    "author",
    "name email"
  );

  if (!reviews) {
    return next(new ErrorHandler(404, "No review found for this product"));
  }

  res.status(200).json({
    reviews,
    success: true,
  });
});

exports.deleteUserReview = catchAsyncError(async (req, res, next) => {
  const { id, reviewId } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    return next(new ErrorHandler(404, "Product not found."));
  }

  let review = await Review.findById(reviewId);
  if (!review) {
    return next(new ErrorHandler(404, "Review not found."));
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

      res.status(200).json({
        success: true,
        product,
        review: {},
      });
    });
  });
});
