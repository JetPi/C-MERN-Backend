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
  res.json({DUMMY_USERS});
}

function createUser(req, res, next) {
    const user = req.body
    DUMMY_USERS.push(user)
  res.status(201).json({ DUMMY_USERS });
}

function loginUser(req, res, next) {
  res.status(200).json({ message: "login user" });
}

exports.getUsers = getUsers;
exports.createUser = createUser;
exports.loginUser = loginUser;
