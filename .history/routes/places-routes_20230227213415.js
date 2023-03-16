const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();

router.get("/:pid", (req, res, next) => {
    console.log('GET Request in Places')
    res.json({message: "It works!"})
});

routr.patch("/:pid", (req, res, next) => {});

router.delete("/:pid", (req, res, next) => {});
