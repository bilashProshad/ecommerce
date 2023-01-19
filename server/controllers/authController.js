const { catchAsyncError } = require("../middlewares/catchAsyncError");
const User = require("../models/User");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendToken } = require("../utils/sendJwtToken");

module.exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(
      new ErrorHandler(400, "Please enter your Name, Email & Password")
    );
  }

  const user = await User.create({ name, email, password });

  sendToken(user, 201, res);
});

module.exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler(400, "Please enter your Email & Password"));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler(401, "Invalid email or password"));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler(401, "Invalid email or password"));
  }

  sendToken(user, 200, res);
});
