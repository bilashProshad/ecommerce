const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Product = require("../models/Product");
const ErrorHandler = require("../utils/ErrorHandler");
const cloudinary = require("cloudinary");

const createProduct = catchAsyncError(async (req, res, next) => {
  const { name, price, description, stock, category } = req.body;

  if (
    !name ||
    !price ||
    !description ||
    !req.body.images ||
    !stock ||
    !category
  ) {
    return next(new ErrorHandler(400, "Please enter all fields"));
  }

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "ecommerce/products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user._id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

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

  const totalProducts = await Product.countDocuments();

  res.status(200).json({
    success: true,
    products,
    totalProducts,
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
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler(404, "Product not found"));
  }

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images from Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "ecommerce/products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate("category");

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

  // Deleting Images from Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
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
