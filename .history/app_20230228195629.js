const express = require('express');
const bodyParser = require('body-parser');

const placeRouter = require('./routes/places-routes')
const userRouter = require("./routes/users-routes");

const app = express()

app.use('/api/places', placeRouter);
app.use('/api/users', userRouter);

app.use((error, req, res, next) => {
    if(res.headerSent){
        return next(error)
    }
    res.status(error.code || 500)
    res.json({message: error.message || "An unknown error ocurred"})
})

app.listen(5000)