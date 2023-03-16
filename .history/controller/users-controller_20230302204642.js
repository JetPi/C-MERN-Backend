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
  res.json({"message": "get users"});
}

function createUser(req, res, next) {
  res.json({ message: "create user" });
}

function loginUser(req, res, next) {
  res.json({ message: "login user" });
}

exports.getUsers = getUsers;
exports.createUser = createUser;
exports.loginUser = loginUser;
