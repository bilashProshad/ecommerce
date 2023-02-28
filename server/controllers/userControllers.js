const { catchAsyncError } = require("../middlewares/catchAsyncError");
const User = require("../models/User");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendToken } = require("../utils/sendJwtToken");

// Get User Details
const getUserDetails = catchAsyncError(async (req, res, next) => {
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
const updateProfile = catchAsyncError(async (req, res, next) => {
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
const updatePassword = catchAsyncError(async (req, res, next) => {
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

// ------------------ Admin -------------------
// Get all users (admin)
const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get single user (admin)
const getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(400, `User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Update user (admin)
const updateUserRole = catchAsyncError(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(
      new ErrorHandler(400, `User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
  });
});

// Delete user (admin)
const deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(400, `User does not exist with Id: ${req.params.id}`)
    );
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

module.exports = {
  getUserDetails,
  updateProfile,
  updatePassword,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
};
