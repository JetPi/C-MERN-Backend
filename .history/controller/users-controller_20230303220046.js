const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");

let DUMMY_USERS = [
  {
    id: "u1",
    username: "Pedro",
    email: "pedro@gmail.com",
    password: "123456",
  },
  {
    id: "u2",
    username: "Juan",
    email: "juan@gmail.com",
    password: "654321",
  },
];

function getUsers(req, res, next) {
  res.json({DUMMY_USERS});
}

function createUser(req, res, next) {
  const error = validationResult(req);
  if (!error.isEmpty) {
    throw new HttpError("Invalid inputs, please try again", 422);
  }
    const {email, username, password} = req.body
    DUMMY_USERS.push({
      id: uuidv4(),
      username,
      email,
      password
    })
  res.status(201).json({ DUMMY_USERS });
}

function loginUser(req, res, next) {
    const {email, password} = req.body
    let validUser = false
    DUMMY_USERS.forEach(user => {
      if(user.email === email && user.password === password){
        validUser = true
      }
    });
    if(!validUser){
      throw new HttpError("User login is not valid", 400);
    }
  res.status(200).json({ message: "Logged in user" });
}

exports.getUsers = getUsers;
exports.createUser = createUser;
exports.loginUser = loginUser;
