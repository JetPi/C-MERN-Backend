const HttpError = require('../models/http-error')

function createError(message, code){
    const error = new HttpError(message, code);
    return next(error);
}

module.exports = createError