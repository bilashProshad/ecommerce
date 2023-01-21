const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Product = require("../models/Product");
const ErrorHandler = require("../utils/ErrorHandler");

const getAllProducts = catchAsyncError(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const products = await Product.find()
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("category")
    .populate("user");

  if (!products) {
    return next(new ErrorHandler(404, "Product not found."));
  }

  res.status(200).json({
    success: true,
    products,
  });
});

const getProductById = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
    .populate("category")
    .populate("user");
  if (!product) {
    return next(new ErrorHandler(404, "Product not found."));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

module.exports = { getAllProducts, getProductById };
