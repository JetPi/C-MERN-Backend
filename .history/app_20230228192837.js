const express = require('express');
const bodyParser = require('body-parser');

const placeRouter = require('./routes/places-routes')
const userRouter = require("./routes/users-routes");

const app = express()

app.use(placeRouter, "/api/places");
app.use(userRouter, "/api/users");

app.listen(5000)