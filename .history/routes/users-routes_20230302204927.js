const express = require("express");
const bodyParser = require("body-parser");
const {getUsers, createUser, loginUser} = require("../controller/users-controller")

const router = express.Router();

//Get all users
router.get("/", getUsers);

//Login as a user
router.post("/login", loginUser);

//Singup as a user
router.post("/signup", createUser);

module.exports = router;
