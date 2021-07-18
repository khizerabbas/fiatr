const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const Vendor = require("../models/Vendor");
const { check, validationResult } = require("express-validator");

router.get("/", auth, async (req, res) => {
  try {
    console.log(req.user);
    return res.json(req.user);
  } catch (err) {
    return res.status(500).send("server errpor");
  }
});

router.get("/users", async (req, res) => {
  try {
    const user = await User.find();
    if (!user) {
      return res.status(400).send("bad request");
    }

    return res.json(user);
  } catch (err) {
    res.status(500).send("server error");
  }
});

router.get("/user/:id", async (req, res) => {
  console.log("in api");
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).send("bad request");
    }

    return res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;

router.post(
  "/",
  [
    //validators
    // check("name", "name is required").not().isEmpty(),
    check("email", "enter the valid email").isEmail(),
    check("password", "enter proper password").isLength({ min: 6 }),
  ],

  async (req, res) => {
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "invalid user not found" }] });
      }

      //USER TOKEN
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res
            .status(400)
            .json({ errors: [{ msg: "invalid creadential" }] });
        }
        payload = {
          user: {
            id: user._id,
          },
        };

        jwt.sign(
          payload,
          config.get("jwtSecret"),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            return res.status(200).json({ user, token });
          }
        );
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).send("server error");
    }
  }
);

module.exports = router;
