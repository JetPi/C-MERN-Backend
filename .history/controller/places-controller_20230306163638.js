const HttpError = require('../models/http-error')
const {validationResult} = require('express-validator')
const {v4: uuidv4} = require('uuid')
const Place = require('../models/place')

let DUMMY_PLACES = [
  {
    id: "1",
    title: "Empire State",
    description: "Stateful",
    location: {
      lat: 40,
      lng: -73,
    },
    address: "Somewhere american",
    creator: "u1",
  },
  {
    id: "2",
    title: "Empire State",
    description: "Stateful",
    location: {
      lat: 40,
      lng: -73,
    },
    address: "Somewhere american",
    creator: "u1",
  },
];

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

    try {
      await createdPlace.save()
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
  console.log(place)
  let place
  try {
    place = await place.findById(placeId)
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, couldn't delete place", 500
      )
      return next(error)
  }
  try {
    await place.remove()
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
