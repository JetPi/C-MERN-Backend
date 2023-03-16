const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");

let DUMMY_USERS = [
  {
    id: "1",
  },
  {
    id: "2",
  },
];

function getUsers(req, res, next) {
  res.json({"message": "cup of cafe"});
}

function createUser(req, res, next) {
  res.json({ message: "cup of cafe" });
}

function loginUser(req, res, next) {
  res.json({ message: "cup of cafe" });
}
