const express = require("express");
const { getAllCategories } = require("../controllers/categoryController");
const router = express.Router();

router.route("/").get(getAllCategories);

module.exports = router;
