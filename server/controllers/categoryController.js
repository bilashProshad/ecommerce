const { catchAsyncError } = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const Category = require("../models/Category");

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

module.exports = {
  getAllCategories,
};
