const moment = require("moment");
const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const ErrorHandler = require("../utils/ErrorHandler");

exports.getDashboardDetails = catchAsyncError(async (req, res, next) => {
  const productsCount = await Product.countDocuments();
  const ordersCount = await Order.countDocuments();
  const usersCount = await User.countDocuments();
  const inStockCount = await Product.countDocuments({ stock: { $gt: 0 } });
  const outOfStockCount = await Product.countDocuments({ stock: { $lte: 0 } });

  const currentDate = new Date();

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(currentDate.getDate() - 30);

  const result = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: thirtyDaysAgo, $lt: currentDate },
      },
    },
    {
      $group: {
        _id: null,
        totalPrice: { $sum: "$totalPrice" },
      },
    },
  ]);

  // Get current date
  const today = moment();

  // Get date 7 days ago
  const lastWeek = moment().subtract(7, "days");

  // Query for orders within last 7 days
  const orders = await Order.find({
    createdAt: {
      $gte: lastWeek.toDate(),
      $lte: today.toDate(),
    },
  });

  // Create array of sales amounts for each day
  const salesByDay = [];
  for (let i = 0; i < 7; i++) {
    const date = moment().subtract(i, "days").startOf("day");
    const daySales = orders.reduce((total, order) => {
      const orderDate = moment(order.createdAt).startOf("day");
      if (date.isSame(orderDate)) {
        return total + order.totalPrice;
      }
      return total;
    }, 0);
    salesByDay.unshift(daySales);
  }

  res.status(200).json({
    success: true,
    stats: {
      productsCount,
      ordersCount,
      usersCount,
      productAvailablity: {
        inStockCount,
        outOfStockCount,
      },
      monthlyTotalSold: result[0].totalPrice,
      // monthlyTotalSold: totalPrice,
      salesByDay,
    },
  });
});
