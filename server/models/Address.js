const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
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
});
module.exports = mongoose.model("Address", addressSchema);
