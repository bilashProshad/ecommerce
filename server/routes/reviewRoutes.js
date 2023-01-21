const express = require("express");
const {
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const { isAuthenticatedUser } = require("../middlewares/auth");
const router = express.Router();

router.route("/:id/review").post(isAuthenticatedUser, createReview);
router
  .route("/:id/review/:reviewId")
  .put(isAuthenticatedUser, updateReview)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
