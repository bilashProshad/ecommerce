const express = require("express");
const {
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/adminOrderController");
const { isAuthenticatedUser, isAdmin } = require("../middlewares/auth");
const router = express.Router();

router.route("/").get(isAuthenticatedUser, isAdmin, getAllOrders);
router.route("/:id").get(isAuthenticatedUser, isAdmin, getSingleOrder);
router.route("/:id").put(isAuthenticatedUser, isAdmin, updateOrder);
router.route("/:id").delete(isAuthenticatedUser, isAdmin, deleteOrder);

module.exports = router;
