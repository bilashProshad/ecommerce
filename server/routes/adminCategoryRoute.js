const express = require("express");
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  searchCategory,
} = require("../controllers/adminCategoryController");
const { isAuthenticatedUser, isAdmin } = require("../middlewares/auth");
const router = express.Router();

router
  .route("/")
  .post(isAuthenticatedUser, isAdmin, createCategory)
  .get(isAuthenticatedUser, isAdmin, getAllCategories);

router.route("/search").get(isAuthenticatedUser, isAdmin, searchCategory);

router
  .route("/:id")
  .get(isAuthenticatedUser, isAdmin, getCategoryById)
  .put(isAuthenticatedUser, isAdmin, updateCategory)
  .delete(isAuthenticatedUser, isAdmin, deleteCategory);

module.exports = router;
