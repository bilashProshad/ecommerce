const { catchAsyncError } = require("../middlewares/catchAsyncError");
const User = require("../models/User");
const ErrorHandler = require("../utils/ErrorHandler");
const sendEmail = require("../utils/sendEmail");
const { sendToken } = require("../utils/sendJwtToken");
const crypto = require("crypto");

// Register User
const registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return next(
      new ErrorHandler(400, "Please enter your Name, Email & Password")
    );
  }

  if (password !== confirmPassword) {
    return next(
      new ErrorHandler(
        400,
        "Please enter your password and confirm password must be same"
      )
    );
  }

  let user = await User.findOne({ email });
  if (user) {
    return next(
      new ErrorHandler(400, "You are already registered with this email")
    );
  }

  user = await User.create({ name, email, password });

  sendToken(user, 201, res);
});

// Login User
const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler(400, "Please enter your Email & Password"));
  }

  const user = await User.findOne({ email })
    .select("+password")
    .populate("address");
  if (!user) {
    return next(new ErrorHandler(401, "Invalid email or password"));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler(401, "Invalid email or password"));
  }

  sendToken(user, 200, res);
});

const logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

// Forgot Password
const forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler(404, "User not found"));
  }

  // Get Reset Password Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // const resetPasswordUrl = `http://localhost:5000/api/v1/auth/password/reset/${resetToken}`;
  const resetPasswordUrl = `${process.env.FRONT_END_URL}/reset/${resetToken}`;
  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, prease ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email send to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(500, error.message));
  }
});

// Reset Password
const resetPassword = catchAsyncError(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        400,
        "Reset Password Token is invalid or has been expired"
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler(400, "Password does not match"));
  }

  user.password = req.body.password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;

  await user.save();

  sendToken(user, 200, res);
});

module.exports = {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
};
