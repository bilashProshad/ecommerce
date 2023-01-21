const express = require("express");
const {
  getUserDetails,
  updateProfile,
  updatePassword,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUserRole,
} = require("../controllers/userControllers");
const { isAuthenticatedUser, isAdmin } = require("../middlewares/auth");
const router = express.Router();

router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/me").put(isAuthenticatedUser, updateProfile);
router.route("/password").put(isAuthenticatedUser, updatePassword);

// ------------------ Admin -------------------
router.route("/admin/users").get(isAuthenticatedUser, isAdmin, getAllUsers);
router
  .route("/admin/users/:id")
  .get(isAuthenticatedUser, isAdmin, getSingleUser)
  .put(isAuthenticatedUser, isAdmin, updateUserRole)
  .delete(isAuthenticatedUser, isAdmin, deleteUser);

module.exports = router;
