const express = require('express');
const bodyParser = require('body-parser');

const app = express()

app.get('/', () => {});

app.get("/user/:uid", () => {});

app.get("/:pid", () => {});

app.post("/", () => {});

app.post("/login", () => {});

app.post("/signup", () => {});

app.patch('/:pid', () => {});

app.delete("/:pid", () => {});

app.listen(5000)