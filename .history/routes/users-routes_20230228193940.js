const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();

//Get all users
router.get("/", (req, res, next) => {});

//Login as a user
router.post("/login", (req, res, next) => {});

//Singup as a user
router.post("/signup", (req, res, next) => {});

module.exports = router;
