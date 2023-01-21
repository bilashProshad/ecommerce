const express = require("express");
const {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProducts,
} = require("../controllers/adminProductController");
const { isAuthenticatedUser, isAdmin } = require("../middlewares/auth");
const router = express.Router();

router
  .route("/")
  .post(isAuthenticatedUser, isAdmin, createProduct)
  .get(isAuthenticatedUser, isAdmin, getAllProducts);

router
  .route("/:id")
  .get(isAuthenticatedUser, isAdmin, getProductById)
  .put(isAuthenticatedUser, isAdmin, updateProduct)
  .delete(isAuthenticatedUser, isAdmin, deleteProduct);

module.exports = router;
