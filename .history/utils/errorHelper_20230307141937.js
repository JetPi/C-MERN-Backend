const HttpError = require('../models/http-error')
const { validationResult } = require("express-validator");
const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const place = require("../models/place");

function createError(message, code){
    const error = new HttpError(message, code);
    return next(error);
}

module.exports = createError