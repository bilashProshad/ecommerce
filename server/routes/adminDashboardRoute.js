const express = require("express");
const {
  getDashboardDetails,
} = require("../controllers/adminDashboardController");
const { isAuthenticatedUser, isAdmin } = require("../middlewares/auth");
const router = express.Router();

router.route("/").get(isAuthenticatedUser, isAdmin, getDashboardDetails);

module.exports = router;
