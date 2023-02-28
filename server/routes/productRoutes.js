const express = require("express");
const {
  getAllProducts,
  getProductById,
  getProductByCategoryId,
} = require("../controllers/productController");
const router = express.Router();

router.route("/").get(getAllProducts);

router.route("/:id").get(getProductById);

router.route("/category/:id").get(getProductByCategoryId);

module.exports = router;
