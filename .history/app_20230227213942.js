const express = require('express');
const bodyParser = require('body-parser');

const placeRouter = require('./routes/places-routes')
const userRouter = require("./routes/users-routes");

const app = express()

app.use(placeRouter);
app.use(userRouter);

app.listen(5000)