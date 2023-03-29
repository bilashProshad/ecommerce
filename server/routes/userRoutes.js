const express = require("express");
const {
  getUserDetails,
  updateProfile,
  updatePassword,
  updateProfilePicture,
} = require("../controllers/userControllers");
const { isAuthenticatedUser, isAdmin } = require("../middlewares/auth");
const router = express.Router();

router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/me").put(isAuthenticatedUser, updateProfile);
router.route("/password").put(isAuthenticatedUser, updatePassword);
router.route("/avatar").put(isAuthenticatedUser, updateProfilePicture);

module.exports = router;
