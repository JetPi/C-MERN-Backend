const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.get("/", () => {});

app.get("/user/:uid", () => {});

app.post("/", () => {});

app.post("/login", () => {});

app.post("/signup", () => {});
