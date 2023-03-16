const express = require("express");
require("dotenv").config();
const fs = require('fs')
const path = require('path')
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placeRouter = require("./routes/places-routes");
const userRouter = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')))

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next()
})

app.use("/api/places", placeRouter);
app.use("/api/users", userRouter);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if(req.file){
    fs.unlink(req.file.path, (err) => {
      console.log(err)
    })
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error ocurred" });
});

// console.log(
//   `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@practicecluster.u8tzr2l.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
// );
mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@practicecluster.u8tzr2l.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
