const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const User = require("../models/User");
const Vendor = require("../models/Vendor");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
var multer = require("multer");
router.post(
  "/",
  [
    check("firstname", "Name is required").not().isEmpty(),
    check("lastname", "Lastname is required").not().isEmpty(),
    check("email", "enter the valid Email").isEmail(),
    check("password", "enter proper password").isLength({ min: 6 }),
  ],

  async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //check user already exits or not
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "user already exists" }] });
      }

      user = new User({
        firstname,
        lastname,
        email,
      });
      //BCRYPT HASHING
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      //JASON WEB TOKEN
      const payload = {
        user: {
          id: user._id,
        },
      };
      //jwt method
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          return res.status(200).json({ user, token }); //it will gives a token
        }
      );
    } catch (err) {
      console.log(err.message);
      return res.status(500).send("server error");
    }
  }
);

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

router.post("/edit/:id", upload.single("profileImage"), async (req, res) => {
  var uploadingfile = "http://localhost:5000/uploads/" + req.file.filename;
  const { firstname, lastname, email, password } = req.body;
  const filter = { _id: req.params.id };
  const update = {
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: password,
    profileImage: uploadingfile,
  };
  try {
    const result = await User.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
    });
    return res.status(201).json(result);
  } catch (err) {
    res.status(500).send("server error");
  }
});

//delete a user by id
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.remove();
      return res.json({ msg: "User removed" });
    } else {
      const vendor = await Vendor.findById(req.params.id);
      await vendor.remove();
      return res.json({ msg: "Vendor removed" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
