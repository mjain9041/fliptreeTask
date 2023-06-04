const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
require('dotenv').config()

mongoose
  .connect("mongodb://127.0.0.1:27017/matrimony_db")
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err.reason);
  });

const authRoute = require("./routes/auth.routes");

const app = express();
app.use(fileUpload());

app.use(express.urlencoded());

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json())

app.use(cors());

// Static directory path
app.use(express.static("uploads"));

// API root
app.use("/api", authRoute);

// PORT
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("Listening on port " + port);
});

// 404 Handler
app.use((req, res, next) => {
  next(createError(404));
});

// Base Route
app.get("/", (req, res) => {
  res.send("invaild endpoint");
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
