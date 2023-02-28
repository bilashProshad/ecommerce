const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Product = require("../models/Product");
const Category = require("../models/Category");
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

const getProductByCategoryId = catchAsyncError(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new ErrorHandler(404, "Category not found"));
  }

  const products = await Product.find({ category: req.params.id })
    .populate("category")
    .populate("user");

  if (!products) {
    return next(new ErrorHandler(404, "Products not found"));
  }

  res.status(200).json({ success: true, products });
});

module.exports = { getAllProducts, getProductById, getProductByCategoryId };

// Search Products by Product Name or Category Name (with Regular Expression)
// app.get('/api/products', async (req, res) => {
//   try {
//     const { searchTerm } = req.query;
//     const categories = await Category.find({
//       name: { $regex: new RegExp(searchTerm, 'i') }
//     });
//     const categoryIds = categories.map(category => category._id);
//     const products = await Product.find({
//       $or: [
//         { name: { $regex: new RegExp(searchTerm, 'i') } },
//         { categories: { $in: categoryIds } }
//       ]
//     }).populate('categories');
//     res.send(products);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });
