const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const User = require('../models/user')
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

function getUsers(req, res, next) {
  res.json({ DUMMY_USERS });
}

async function createUser(req, res, next) {
  const error = validationResult(req);
  if(!error.isEmpty()){
    return next(
      new HttpError("Invalid inputs. check the data", 422)
    )
  }
  const { email, name, password, image, places } = req.body;

  let existingUser
  try {
    existingUser = await User.findOne({email})
  } catch (err) {
    const error = new HttpError(
      "Couldn't reach server, please try later", 500
    )
    return next(error)
  }
  if (existingUser){
    const error = new HttpError("User already exists, please try logging in", 422);
    return next(error);
  }

  const newUser = new User({
    name,
    email,
    password,
    image,
    places
  })

  try {
    newUser.save()
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again",
      500
    );
    return next(error);
  }
  
  res.status(201).json({user: newUser.toObject({getters: true})});
}

async function loginUser(req, res, next) {
  const { email, password } = req.body;

  let existingUser
  try {
    existingUser = await User.findOne({email: email})
  } catch (err) {
    const error = new HttpError(
      "Couldn't reach server, please try later", 500
    )
    return next(error)
  }
  console.log(existingUser)

  if(!existingUser || existingUser.password !== password){
    const error = new HttpError("Invalid credentials, couldn't log you in.", 401);
    return next(error);
  }
  
  res.status(200).json({ message: "Logged in user" });
}

exports.getUsers = getUsers;
exports.createUser = createUser;
exports.loginUser = loginUser;
