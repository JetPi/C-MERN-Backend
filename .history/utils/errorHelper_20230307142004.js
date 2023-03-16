const HttpError = require('../models/http-error')
const express = require("express");

function createError(message, code){
    const error = new HttpError(message, code);
    return next(error);
}

module.exports = createError