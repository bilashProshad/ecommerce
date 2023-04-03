const { catchAsyncError } = require("../middlewares/catchAsyncError");
const User = require("../models/User");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendToken } = require("../utils/sendJwtToken");
const cloudinary = require("cloudinary");

// Get User Details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate("address");

  if (!user) {
    return next(new ErrorHandler(404, "User not found!"));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Update user profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  }).populate("address");

  res.status(200).json({
    success: true,
    user,
  });
});

// Update user password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler(400, "Old password is incorrect"));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler(400, "Password does not match"));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
});

exports.updateProfilePicture = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const { image } = req.body;

  if (!image) {
    return next(new ErrorHandler(400, "Please upload an image"));
  }

  if (user.avatar && user.avatar.public_id) {
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
  }

  const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "ecommerce/category",
    width: 250,
    crop: "scale",
  });

  user.avatar = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };

  await user.save();

  res.status(200).json({
    success: true,
    user,
  });
});
