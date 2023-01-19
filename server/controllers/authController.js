const User = require("../models/User");
const { sendToken } = require("../utils/sendJwtToken");

module.exports.registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({ name, email, password });

  sendToken(user, 201, res);
};

module.exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return res.send("invalid email or password");
  }

  sendToken(user, 200, res);
};
