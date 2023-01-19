module.exports.errorMiddleware = (err, req, res, next) => {
  const message = err.message || "Internal server error";
  const status = err.status || 500;

  res.status(status).json({
    success: false,
    message,
  });
};
