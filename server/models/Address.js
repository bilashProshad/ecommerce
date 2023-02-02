const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    contactNo: {
      type: Number,
      required: [true, "Please enter your phone number"],
    },
    address: {
      type: String,
      required: [true, "Please enter your address"],
    },
    district: {
      type: String,
      required: [true, "Please enter your district"],
    },
    division: {
      type: String,
      required: [true, "Please enter your division"],
    },
    country: {
      type: String,
      required: [true, "Please enter your country"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Address", addressSchema);
