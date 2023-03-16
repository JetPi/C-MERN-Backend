const HttpError = require('../models/http-error')
const mongoose = require('mongoose')
const {validationResult} = require('express-validator')
const {v4: uuidv4} = require('uuid')
const Place = require('../models/place')
const User = require('../models/user')

async function getPlaceById(req, res, next) {
  const placeId = req.params.pid;
  let place
  try{
    place = await Place.findById(placeId)
  } catch(err){
    const error = new HttpError(
      "Something went wrong, couldn't find a place", 500
    )
    return next(error)
  }

  if (!place) {
    const error = new HttpError("Couldn't find requested place", 404);
    return next(error)
  }

  res.json({ place: place.toObject({getters: true}) });
}

async function getPlaceByUser(req, res, next) {
  const userId = req.params.uid;
  let place
  try {
    place = await Place.find({creator: userId})
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, couldn't make request",
      500
    );
    return next(error);
  }

  if (!place || place.length === 0) {
    return next(new HttpError("Couldn't find requested user", 404));
  }

  res.json({ places: place.map(place => place.toObject({getters: true})) });
}

async function createPlace(req, res, next) {
    const {title, description, location, address, creator, image} = req.body
    const error = validationResult(req)
    if(!error.isEmpty){
      throw new HttpError("Invalid inputs, please try again", 422);
    }
    const createdPlace = new Place({
      title,
      description,
      location,
      image,
      address,
      creator,
    }); 

    let user;
    try {
      user = await User.findById(creator)
    } catch (err) {
      const error = new HttpError(
        "Failed to connect to server, please try again", 500
      )
      return next(error)
    }

    if(!user){
      const error = new HttpError("Couldn't find user, please try again", 404);
      return next(error);
    }

    console.log(createdPlace)

    try {
      const sess = await mongoose.startSession()
      sess.startTransaction()
      await createdPlace.save({session: sess})
      user.places.push(createdPlace)
      await user.save({session: sess})
      await sess.commitTransaction()
      sess.endSession()

    } catch (err) {
      const error = new HttpError(
        'Creating place failed, please try again', 500
      )
      return next(error)
    }

    res.status(201).json({place: createdPlace})
}

async function modifyPlace(req, res, next) {
  const error = validationResult(req);
  if (!error.isEmpty) {
    throw new HttpError("Invalid inputs, please try again", 422);
  }
  const { title, description} = req.body;
  const placeId = req.params.pid;

  let place
  try{
    place = await Place.findById(placeId)
  } catch(err){
    const error = new HttpError(
      "Something went wrong, couldn't find a place", 500
    )
    return next(error)
  }

  place.title = title
  place.description = description

  try {
    await place.save()
  } catch (err) {
    "Something went wrong, couldn't update place", 500;
    return next(error)
  }
  
  res.status(200).json({place: place.toObject({getters: true})})
}

async function deletePlace(req, res, next) {
  const placeId = req.params.pid;

  let place
  try {
    place = await Place.findById(placeId).populate('creator')
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, couldn't delete place", 500
      )
      return next(error)
  }
  
  if(!place){
    const error = new HttpError(
      "Couldn't find place, please try again",
      404
    );
    return next(error);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
      await place.deleteOne({session})
      place.creator.places.pull(place);
      await place.creator.save({ session });
      await session.commitTransaction();
    session.endSession();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, couldn't delete place",
      500
    );
    return next(error);
  }

  res.status(200).json({message: "Place successfully deleted"})
}

exports.getPlaceById = getPlaceById;
exports.getPlaceByUser = getPlaceByUser;
exports.createPlace = createPlace;
exports.modifyPlace = modifyPlace;
exports.deletePlace = deletePlace;
