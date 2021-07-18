const mongoose = require("mongoose");

const Vendorschema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  totalEnquiry: {
    type: Number,
    default: 0,
  },
  activeEnquiry: {
    default: 0,
    type: Number,
  },
  completedEnquiry: {
    default: 0,
    type: Number,
  },
  activate: {
    type: Boolean,
    default: true,
  },
});

module.exports = Vendor = mongoose.model("vendor", Vendorschema);
