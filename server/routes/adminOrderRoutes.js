const express = require("express");
const { getAllOrders } = require("../controllers/adminOrderController");
const { isAuthenticatedUser, isAdmin } = require("../middlewares/auth");
const router = express.Router();

router.route("/").get(isAuthenticatedUser, isAdmin, getAllOrders);

module.exports = router;
