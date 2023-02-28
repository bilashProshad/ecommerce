const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Address = require("../models/Address");
const User = require("../models/User");
const ErrorHandler = require("../utils/ErrorHandler");

exports.address = catchAsyncError(async (req, res, next) => {
  const { contactNo, post, district, division, country } = req.body;
  const user = req.user;

  if (!user) {
    return next(new ErrorHandler(403, "Please login to update your address"));
  }

  let address = await Address.findOne({ user: user._id });

  if (!address) {
    address = await Address.create({
      contactNo,
      post,
      district,
      division,
      country,
      user: user._id,
    });

    await User.findByIdAndUpdate(user._id, { address: address._id });

    return res.status(200).json({
      success: true,
      address,
    });
  }

  address = await Address.findByIdAndUpdate(
    address._id,
    { contactNo, post, district, division, country },
    { new: true }
  );

  res.status(200).json({
    success: true,
    address,
  });
});
