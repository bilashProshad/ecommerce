require("dotenv").config();
const express = require("express");
const app = express();
const connectDatabase = require("./config/database");
const cookieParser = require("cookie-parser");
const { errorMiddleware } = require("./middlewares/errorMiddleware");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

connectDatabase();

app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/v1", authRoutes);
app.use("/api/v1", userRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to home page</h1>");
});

app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
