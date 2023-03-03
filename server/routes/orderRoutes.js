const express = require("express");
const { newOrder } = require("../controllers/orderController");
const { isAuthenticatedUser } = require("../middlewares/auth");
const router = express.Router();

router.route("/new").post(isAuthenticatedUser, newOrder);
// router.route("/:id").get(isAuthenticatedUser)
// router.route("/me").get(isAuthenticatedUser)

module.exports = router;
