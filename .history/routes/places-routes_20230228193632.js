const express = require("express");
const bodyParser = require("body-parser");

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
router.get("/:pid", (req, res, next) => {
    const placeId = req.params.pid
    const place = DUMMY_PLACES.find((p) => {return p.id === placeId})
    res.json({place})
});

//Get place by user
router.get("/user/:uid", (req, res, next) => {});

//Post a new place
router.post("/", (req, res, next) => {});

//Modify place
router.patch("/:pid", (req, res, next) => {});

//Delete place
router.delete("/:pid", (req, res, next) => {});

module.exports = router;