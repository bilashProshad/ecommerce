const { catchAsyncError } = require("../middlewares/catchAsyncError");
const User = require("../models/User");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendToken } = require("../utils/sendJwtToken");

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
  });

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
