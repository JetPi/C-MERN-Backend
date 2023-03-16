const HttpError = require("../models/http-error")

module.exports = (req,res,next) => {
    let token
    try {
        token = req.headers.authorization.split(' ')[1]  //authorization: "bearer Token"
        if(!token){
            throw new Error("Authentication failed")
        }
    } catch (err) {
        const error = new HttpError('Authentication failed', 401)
        return next(error)
    }
        
    }

    if(!token){
}