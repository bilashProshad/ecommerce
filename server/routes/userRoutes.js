const express = require("express");
const {
  getUserDetails,
  updateProfile,
  updatePassword,
} = require("../controllers/userControllers");
const { isAuthenticatedUser, isAdmin } = require("../middlewares/auth");
const router = express.Router();

router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/me").put(isAuthenticatedUser, updateProfile);
router.route("/password").put(isAuthenticatedUser, updatePassword);

module.exports = router;
