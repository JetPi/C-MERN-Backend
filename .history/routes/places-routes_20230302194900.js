const express = require("express");
const bodyParser = require("body-parser");
const HttpError = require('../models/http-error')
const {getPlaceById, getPlaceByUser, createPlace, modifyPlace} = require('../controller/places-controller')
 
const router = express.Router();

//Get place
router.get("/:pid", getPlaceById);

//Get place by user
router.get("/user/:uid", getPlaceByUser);

//Post a new place
router.post("/", createPlace);

//Modify place
router.patch("/:pid", modifyPlace);

//Delete place
router.delete("/:pid", (req, res, next) => {});

module.exports = router;