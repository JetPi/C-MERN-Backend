const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();

const DUMMY_PLACES = [
    {
        id:1,
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

router.get("/:pid", (req, res, next) => {
    console.log('GET Request in Places')
    res.json({message: "It works!"})
});

router.patch("/:pid", (req, res, next) => {});

router.delete("/:pid", (req, res, next) => {});

module.exports = router;