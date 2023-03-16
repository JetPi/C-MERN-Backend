const express = require("express");
const bodyParser = require("body-parser");
const HttpError = require('../models/http-error')
const placeControllers = require('../controller/places-controller')
 
const router = express.Router();

//Get place
router.get("/:pid", placesControllers.getPlaceById);

//Get place by user
router.get("/user/:uid", getPlaceByUser(req, res, next));

//Post a new place
router.post("/", (req, res, next) => {});

//Modify place
router.patch("/:pid", (req, res, next) => {});

//Delete place
router.delete("/:pid", (req, res, next) => {});

module.exports = router;