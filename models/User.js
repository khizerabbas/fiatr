const mongoose = require("mongoose");

const Userschema = new mongoose.Schema({
  id: { type: String },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  profileImage: {
  },
});

module.exports = User = mongoose.model("user", Userschema);
