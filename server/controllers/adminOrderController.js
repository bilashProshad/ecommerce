const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Order = require("../models/Order");
const Product = require("../models/Product");

exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  res.status(200).json({
    success: true,
    orders,
  });
});

exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email")
    .populate("shippingInfo");

  if (!order) {
    return next(new ErrorHandler(404, "Order not found"));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler(404, "Order not found with this Id"));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler(400, "You have already delivered this order"));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (order) => {
      await updateStock(order.product, order.quantity);
    });
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler(404, "Order not found with this Id"));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});
