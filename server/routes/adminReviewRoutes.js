const express = require("express");
const {
  getProductReviews,
  deleteUserReview,
} = require("../controllers/adminReviewController");
const { isAuthenticatedUser, isAdmin } = require("../middlewares/auth");
const router = express.Router();

router
  .route("/:id/reviews")
  .get(isAuthenticatedUser, isAdmin, getProductReviews);

router
  .route("/:id/review/:reviewId")
  .delete(isAuthenticatedUser, isAdmin, deleteUserReview);

module.exports = router;
