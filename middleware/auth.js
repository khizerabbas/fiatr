const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //get the token from header
  //verify token
  const token = req.header("x-auth-token");
  console.log(token);
  try {
    if (!token) {
      return res.status(401).json({ msg: "no token authorization denied" });
    }
    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      console.log("it is custome jwt");
      decodedData = jwt.verify(token, config.get("jwtSecret"));
      req.user = decodedData.user.id;
    } else {
      decodedData = jwt.decode(token);
      console.log(decodedData);
      req.user = decodedData.sub;
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: "invalid token" });
  }
};
