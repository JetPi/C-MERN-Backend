module.exports = (req,res,next) => {
    const token = req.headers.authorization.split(' ')  //authorization: "bearer Token"
}