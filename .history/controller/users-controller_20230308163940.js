const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const User = require('../models/user')
const place = require("../models/place");

async function getUsers(req, res, next) {
  let users
  try {
    users = await User.find({}, "-password")
  } catch (err) {
    const error = new HttpError("Couldn't reach server, please try later", 500);
    return next(error);
  }
  res.json({users: users.map(user => user.toObject({getters: true}))})
}

async function createUser(req, res, next) {
  const error = validationResult(req);
  if(!error.isEmpty()){
    return next(
      new HttpError("Invalid inputs. check the data", 422)
    )
  }
  const { email, name, password, image } = req.body;

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
    places: []
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

  if(!existingUser || existingUser.password !== password){
    const error = new HttpError("Invalid credentials, couldn't log you in.", 401);
    return next(error);
  }
  console.log(existingUser._id)
  res.status(200).json({ user: existingUser.toObject({getters: true}) });
}

exports.getUsers = getUsers;
exports.createUser = createUser;
exports.loginUser = loginUser;
