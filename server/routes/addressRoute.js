const express = require("express");
const { address } = require("../controllers/addressController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middlewares/auth");

router.route("/").put(isAuthenticatedUser, address);

module.exports = router;
