const express = require("express");
const bodyParser = require("body-parser");
const HttpError = require('../models/http-error')

const router = express.Router();

const DUMMY_PLACES = [
    {
        id: "p1",
        title:"Empire State",
        description: "Stateful",
        location:{
            lat: 40,
            lng: -73
        },
        address: "Somewhere american",
        creator: "u1"
    }
]

//Get place
router.get("/:pid", getPlaceById(req, res, next));

//Get place by user
router.get("/user/:uid", getPlaceByUser(req, res, next));

//Post a new place
router.post("/", (req, res, next) => {});

//Modify place
router.patch("/:pid", (req, res, next) => {});

//Delete place
router.delete("/:pid", (req, res, next) => {});

module.exports = router;