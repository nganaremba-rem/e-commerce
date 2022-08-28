const mongoose = require("mongoose");

const userDetails = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Address: {
    type: Array,
    required: true,
  },
  PhoneNo: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Cart: {
    type: Array,
  },
  Orders: {
    type: Array,
  },
});

module.exports = mongoose.model("userDetails", userDetails);
