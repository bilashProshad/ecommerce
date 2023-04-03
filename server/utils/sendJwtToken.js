module.exports.sendToken = async (user, statusCode, res) => {
  const token = user.getJWT();

  user = user.toObject();
  delete user.password;

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(
      Date.now() + 1000 * 60 * 60 * 24 * process.env.COOKIE_EXPIRE
    ),
  };
  res.status(statusCode).cookie("ecom_bp_token", token, options).json({
    success: true,
    user,
  });
};
