const express = require("express");
const {
  getAllProducts,
  getProductById,
} = require("../controllers/productController");
const { isAuthenticatedUser, isAdmin } = require("../middlewares/auth");
const router = express.Router();

router.route("/").get(getAllProducts);

router.route("/:id").get(getProductById);

module.exports = router;
