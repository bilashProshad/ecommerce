const express = require("express");
const {
  newOrder,
  myOrders,
  getSingleOrder,
} = require("../controllers/orderController");
const { isAuthenticatedUser } = require("../middlewares/auth");
const router = express.Router();

router.route("/new").post(isAuthenticatedUser, newOrder);
router.route("/me").get(isAuthenticatedUser, myOrders);
router.route("/:id").get(isAuthenticatedUser, getSingleOrder);

module.exports = router;
