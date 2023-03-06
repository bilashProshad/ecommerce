const express = require("express");
const {
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/adminUserController");
const { isAuthenticatedUser, isAdmin } = require("../middlewares/auth");
const router = express.Router();

// ------------------ Admin -------------------
router.route("/").get(isAuthenticatedUser, isAdmin, getAllUsers);
router
  .route("/:id")
  .get(isAuthenticatedUser, isAdmin, getSingleUser)
  .put(isAuthenticatedUser, isAdmin, updateUserRole)
  .delete(isAuthenticatedUser, isAdmin, deleteUser);

module.exports = router;
