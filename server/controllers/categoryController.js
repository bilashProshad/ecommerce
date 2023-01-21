const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Category = require("../models/Category");
const ErrorHandler = require("../utils/ErrorHandler");

const createCategory = catchAsyncError(async (req, res, next) => {
  const { name, image } = req.body;

  if (!name || !image) {
    return next(new ErrorHandler(400, "Please enter all fields"));
  }

  const category = await Category.create({ name, image });

  res.status(201).json({
    success: true,
    category,
  });
});

const getAllCategories = catchAsyncError(async (req, res, next) => {
  const categories = await Category.find();

  if (!categories) {
    return next(new ErrorHandler(404, "Category not found"));
  }

  res.status(200).json({
    success: true,
    categories,
  });
});

const getCategoryById = catchAsyncError(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new ErrorHandler(404, "Category not found"));
  }
  res.status(200).json({ success: true, category });
});

const updateCategory = catchAsyncError(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!category) {
    return next(new ErrorHandler(404, "Category not found"));
  }
  res.status(200).json({ success: true, category });
});

const deleteCategory = catchAsyncError(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new ErrorHandler(404, "Category not found"));
  }
  await category.remove();
  res.status(200).json({ success: true, message: "Category deleted" });
});

const searchCategory = catchAsyncError(async (req, res, next) => {
  const { q } = req.query;

  const category = await Category.find({ name: { $regex: q, $options: "i" } });
  if (!category) {
    return next(new ErrorHandler(404, "Category not found"));
  }
  res.status(200).json({ success: true, category });
});

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  searchCategory,
};
