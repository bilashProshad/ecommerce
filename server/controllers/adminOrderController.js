const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Order = require("../models/Order");

exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  res.status(200).json({
    success: true,
    orders,
  });
});
