const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Product = require("../models/Product");
const ErrorHandler = require("../utils/ErrorHandler");

const createProduct = catchAsyncError(async (req, res, next) => {
  const { name, price, description, images, stock, category } = req.body;

  if (!name || !price || !description || !images || !stock || !category) {
    return next(new ErrorHandler(400, "Please enter all fields"));
  }

  req.body.user = req.user._id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

const getAllProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();

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

const updateProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!product) {
    return next(new ErrorHandler(404, "Product not found."));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

const deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler(404, "Product not found"));
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
