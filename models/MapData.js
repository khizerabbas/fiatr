const mongoose = require("mongoose");

const MapSchema = new mongoose.Schema({
  creator: String,
  roomRent: {
    type: String,
  },
  depositAmount: {
    type: String,
  },
  roomConfig: {
    type: String,
  },
  floor: {
    type: String,
  },
  facing: {
    type: String,
  },
  contactNo: {
    type: String,
  },
  Name: {
    type: String,
  },
  roomImg: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  currentLocation: [
    {
      lat: {
        type: String,
      },
      lng: {
        type: String,
      },
    },
  ],
  Status: {
    type: String,
    default: "active",
  },
});

module.exports = MapData = mongoose.model("mapdata", MapSchema);
