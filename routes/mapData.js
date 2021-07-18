const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const MapData = require("../models/MapData");
var multer = require("multer");

router.get("/", async (req, res) => {
  try {
    const mapdata = await MapData.find();
    return res.json(mapdata);
  } catch (err) {
    res.send("API ERROR");
  }
});

router.get("/mydata", auth, async (req, res) => {
  try {
    const Mydata = await MapData.find({
      creator: req.user,
    });
    if (!Mydata) {
      return res.status(400).send("no profile");
    }
    return res.json(Mydata);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post("/", auth, upload.single("roomImage"), async (req, res) => {
  console.log(req.user);
  var uploadingfile = "http://localhost:5000/uploads/" + req.file.filename;
  const {
    roomRent,
    depositAmount,
    roomConfig,
    floor,
    facing,
    contactNo,
    Name,
    description,
    lat,
    lng,
  } = req.body;
  const valueField = {};
  valueField.creator = req.user;
  if (roomRent) valueField.roomRent = roomRent;
  if (depositAmount) valueField.depositAmount = depositAmount;
  if (roomConfig) valueField.roomConfig = roomConfig;
  if (floor) valueField.floor = floor;
  if (facing) valueField.facing = facing;
  if (contactNo) valueField.contactNo = contactNo;
  if (Name) valueField.Name = Name;
  valueField.image = uploadingfile;
  if (description) valueField.description = description;
  const location = {
    lat,
    lng,
  };
  valueField.currentLocation = location;

  const values = new MapData(valueField);
  try {
    const result = await values.save();
    return res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const mydata = await MapData.findById(req.params.id);
    if (!mydata) {
      res.status(400).send("Not found");
    }
    await mydata.remove();
    return res.json(mydata);
  } catch (err) {
    res.status(500).send("server errror");
  }
});

router.post("/status/:id", auth, async (req, res) => {
  try {
    const status = req.body.status;
    const mydata = await MapData.find({
      creator: req.userId,
    });
    let updatedData = await MapData.findOneAndUpdate(
      { _id: req.params.id },
      {
        Status: status,
      },
      { upsert: true }
    );

    mydata.forEach((data) => {
      if (data._id.toString() === updatedData._id.toString()) {
        data.Status = status;
      }
    });
    return res.json(mydata);
  } catch (err) {
    res.status(500).send("server errror");
  }
});

module.exports = router;
