const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const rankingRoutes = require("./routes/ranking");

mongoose.set("strictQuery", false);
const app = express();

app.use(bodyParser.json());

app.use("/api", rankingRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/rankingDB")
  .then(() => {
    app.listen(8100);
  })
  .catch((err) => console.log(err));
