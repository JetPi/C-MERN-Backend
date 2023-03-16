const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.get("/", (req, res, next) => {});

app.get("/user/:uid", (req, res, next) => {});

app.post("/", (req, res, next) => {});

app.post("/login", (req, res, next) => {});

app.post("/signup", (req, res, next) => {});
