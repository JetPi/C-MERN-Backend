const HttpError = require("../models/http-error")
const jwt = require('jsonwebtoken')

module.exports = (req,res,next) => {
    let token

    try {
        token = req.headers.authorization.split(' ')[1]  //authorization: "bearer Token"
        if(!token){
            throw new Error("Authentication failed")
        }
        jwt.verify(token, "supersecretomegadontshare");
    } catch (err) {
        const error = new HttpError('Authentication failed', 401)
        return next(error)
    }



        
    }