const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Category = require("../models/Category");
const ErrorHandler = require("../utils/ErrorHandler");
const cloudinary = require("cloudinary");

const createCategory = catchAsyncError(async (req, res, next) => {
  const { name, image } = req.body;

  if (!name || !image) {
    return next(new ErrorHandler(400, "Please enter all fields"));
  }

  const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "ecommerce/category",
    // width: 250,
    // crop: "scale",
  });

  const category = await Category.create({
    name,
    image: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    category,
  });
});

const getAllCategories = catchAsyncError(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit);

  let categories;

  if (limit) {
    categories = await Category.find()
      .skip((page - 1) * limit)
      .limit(limit);
  } else {
    categories = await Category.find();
  }

  if (!categories) {
    return next(new ErrorHandler(404, "Category not found"));
  }

  const totalCategories = await Category.countDocuments();

  res.status(200).json({
    success: true,
    categories,
    totalCategories,
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
  const newCategoryData = {
    name: req.body.name,
  };

  if (!req.body.name) {
    return next(new ErrorHandler(400, "Please enter all fields"));
  }

  if (req.body.image !== "") {
    const category = await Category.findById(req.params.id);
    const imageId = category.image.public_id;
    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "ecommerce/category",
      // width: 250,
      // crop: "scale",
    });

    newCategoryData.image = {
      public_id: myCloud.public_id,
      url: myCloud.url,
    };
  }

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    newCategoryData,
    {
      new: true,
    }
  );
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

  const imageId = category.image.public_id;
  await cloudinary.v2.uploader.destroy(imageId);

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
