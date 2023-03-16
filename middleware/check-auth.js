const HttpError = require("../models/http-error")
const jwt = require('jsonwebtoken')

module.exports = (req,res,next) => {
    if(req.method === 'OPTIONS'){
        return next()
    }

    let token
    try {
        token = req.headers.authorization.split(' ')[1]  //authorization: "bearer Token"
        if(!token){
            throw new Error("Authentication failed")
        }
        const decodedToken = jwt.verify(token, "supersecretomegadontshare");
        req.userData = {userId: decodedToken.userId}
        next();
    } catch (err) {
        const error = new HttpError('Authentication failed', 401)
        return next(error)
    }
    }