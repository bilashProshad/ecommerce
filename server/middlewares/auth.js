const { catchAsyncError } = require("./catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { ecom_bp_token } = req.cookies;

  if (!ecom_bp_token) {
    return next(new ErrorHandler(401, "Please login to access this resource"));
  }

  const decodedData = jwt.verify(ecom_bp_token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  next();
});

module.exports.isAdmin = catchAsyncError(async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(
      new ErrorHandler(
        403,
        `Role: ${req.user.role} is not allowed to access this resource`
      )
    );
  }

  next();
});
