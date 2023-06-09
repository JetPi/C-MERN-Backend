const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placeRouter = require("./routes/places-routes");
const userRouter = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placeRouter);
app.use("/api/users", userRouter);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error ocurred" });
});

mongoose
  .connect(
    "mongodb+srv://ibrahimzarragaam:o88I0KU7wchhTfkC>@practicecluster.u8tzr2l.mongodb.net/product_test?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });

