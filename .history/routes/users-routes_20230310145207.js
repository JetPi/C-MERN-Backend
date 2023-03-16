const express = require("express");
const bodyParser = require("body-parser");
const { check } = require("express-validator");
const {getUsers, createUser, loginUser} = require("../controller/users-controller")
const fileUpload = require('../middleware/file-upload')

const router = express.Router();

//Get all users
router.get("/", getUsers);

//Login as a user
router.post("/login", loginUser);

//Singup as a user
router.post("/signup",[
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check('password').isLength({min: 8})
], createUser);

module.exports = router;
