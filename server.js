const express = require("express");
var path = require("path");
const cors = require("cors");
const app = express();
const dbconnect = require("./config/db");
dbconnect();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server connected at port no ${PORT}`));
app.use(express.json({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/user", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/v1/addmapdata", require("./routes/mapData"));
app.use("/api/v1/getmapdata", require("./routes/mapData"));
app.use("/api/v1/deletemydata", require("./routes/mapData"));
app.use("/api", require("./routes/mapData"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
