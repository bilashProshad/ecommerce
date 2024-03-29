const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Product = require("../models/Product");
const Category = require("../models/Category");
const ErrorHandler = require("../utils/ErrorHandler");
const Review = require("../models/Review");

exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  let { minPrice, maxPrice, outofstock, sortBy, rating, q } = req.query;

  let categories = req.query.categories ? req.query.categories.split(",") : [];

  const query = {};

  if (q !== null) {
    const searchCategories = await Category.find({
      name: { $regex: new RegExp(q, "i") },
    });

    const categoryIds = searchCategories.map((category) => category._id);

    query.$or = [
      { name: new RegExp(q, "i") },
      { category: { $in: categoryIds } },
    ];
  }

  if (minPrice && maxPrice) {
    query.price = { $gte: minPrice, $lte: maxPrice };
  } else if (minPrice) {
    query.price = { $gte: minPrice };
  } else if (maxPrice) {
    query.price = { $lte: maxPrice };
  }

  if (categories.length > 0) {
    query.category = { $in: categories };
  }

  if (outofstock === "true") {
    query.stock = { $gt: 0 };
  }

  if (rating) {
    query.ratings = { $gte: rating, $lte: 5 };
  }

  let sort = {};

  if (sortBy === "asc") {
    sort = { price: 1 };
  } else if (sortBy === "desc") {
    sort = { price: -1 };
  }

  const products = await Product.find(query)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("category")
    .populate("user");

  const totalProducts = await Product.countDocuments(query);

  if (!products) {
    return next(new ErrorHandler(404, "Product not found."));
  }

  res.status(200).json({
    success: true,
    products,
    totalProducts,
  });
});

exports.getProductById = catchAsyncError(async (req, res, next) => {
  const productId = req.params.id;
  const product = await Product.findById(productId)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
        select: "name avatar",
      },
    })
    .populate("category", "name")
    .populate("user", "name email");

  if (!product) {
    return next(new ErrorHandler(404, "Product not found."));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

exports.getProductByCategoryId = catchAsyncError(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new ErrorHandler(404, "Category not found"));
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  let { minPrice, maxPrice, outofstock, sortBy, rating } = req.query;

  const query = {};
  query.category = req.params.id;

  if (minPrice && maxPrice) {
    query.price = { $gte: minPrice, $lte: maxPrice };
  } else if (minPrice) {
    query.price = { $gte: minPrice };
  } else if (maxPrice) {
    query.price = { $lte: maxPrice };
  }

  if (outofstock === "true") {
    query.stock = { $gt: 0 };
  }

  if (rating) {
    query.ratings = { $gte: rating, $lte: 5 };
  }

  let sort = {};

  if (sortBy === "asc") {
    sort = { price: 1 };
  } else if (sortBy === "desc") {
    sort = { price: -1 };
  }

  const products = await Product.find(query)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("category")
    .populate("user");

  const totalProducts = await Product.countDocuments(query);

  if (!products) {
    return next(new ErrorHandler(404, "Product not found."));
  }

  res.status(200).json({ success: true, products, totalProducts });
});
