const createError = require("../utils/errorHelper");
const { validationResult } = require("express-validator");
const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const place = require("../models/place");

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

async function getUsers(req, res, next) {
  let users;
  try {
  } catch (err) {}
  users = await User.find({}, "-password");
}

async function createUser(req, res, next) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    createError("Invalid inputs. check the data", 422);
  }
  const { email, name, password, image, places } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    createError("Couldn't reach server, please try later", 500);
  }
  if (existingUser) {
    createError("User already exists, please try logging in", 422);
  }

  const newUser = new User({
    name,
    email,
    password,
    image,
    places,
  });

  try {
    newUser.save();
  } catch (err) {
    createError("Signing up failed, please try again", 500);
  }

  res.status(201).json({ user: newUser.toObject({ getters: true }) });
}

async function loginUser(req, res, next) {
  const { email, password } = req.body;

  console.log(createError)
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    createError("Couldn't reach server, please try later", 500);
  }

  if (!existingUser || existingUser.password !== password) {
    createError("Invalid credentials, couldn't log you in.", 401);
  }

  res.status(200).json({ message: "Logged in user" });
}

exports.getUsers = getUsers;
exports.createUser = createUser;
exports.loginUser = loginUser;
