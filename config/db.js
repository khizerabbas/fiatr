const mongoose = require("mongoose");
const config = require("config");
// const db = config.get("mongoURI");

const connectdb = async () => {
  try {
    await mongoose.connect('mongodb+srv://prasanna:1234@cluster0.rgy45.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("mongo db connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectdb;
