const HttpError = require("../models/http-error");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
  const { email, name, password } = req.body;

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

  let hashedPassword
  try {
    hashedPassword = await bcrypt.hash(password, 12)
  } catch (err) {
    const error = new HttpError(
      "Couldn't generate password",
      500
    );
    return next(error);
  }

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    image: req.file.path,
    places: [],
  });

  try {
    await newUser.save()
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again",
      500
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign({
      userId: newUser.id,
      email: newUser.email
    }, process.env.JWT_KEY, {
      expiresIn: '1h'
    })
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again", 500);
     return next(error);
  }
  
  res.status(201).json({userId: newUser.id, email: newUser.email, token: token});
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

  if(!existingUser){
    const error = new HttpError("Invalid credentials, couldn't find user.", 401);
    return next(error);
  }

  let isValid = false
  try {
    isValid = await bcrypt.compare(password, existingUser.password)
  } catch (err) {
    const error = new HttpError(
      "Invalid credentials, couldn't log you in.",
      500
    );
    return next(error);
  }

  if(!isValid){
    const error = new HttpError(
      "Invalid credentials, couldn't find user.",
      401
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
      },
      "supersecretomegadontshare",
      {
        expiresIn: "1h",
      }
    );
  } catch (err) {
    const error = new HttpError("Log in failed, please try again", 500);
    return next(error);
  }

  res.status(200).json({ userId: existingUser.id, email: existingUser.email, token: token });
}

exports.getUsers = getUsers;
exports.createUser = createUser;
exports.loginUser = loginUser;
