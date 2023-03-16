const express = require("express");
const bodyParser = require("body-parser");
const { route } = require("./places-routes");

const router = express.Router();

router.get("/", (req, res, next) => {});

router.get("/user/:uid", (req, res, next) => {});

router.post("/", (req, res, next) => {});

router.post("/login", (req, res, next) => {});

router.post("/signup", (req, res, next) => {});

module.exports = router
