const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");

let DUMMY_USERS = [
  {
    username: "Pedro",
    email: "pedro@gmail.com",
    password: "123456",
  },
  {
    username: "Juan",
    email: "juan@gmail.com",
    password: "654321",
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

exports.getUsers = getUsers;
exports.createUser = createUser;
exports.loginUser = loginUser;
