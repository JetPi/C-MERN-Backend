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

function getPlaceById(req, res, next) {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  if (!place) {
    throw new HttpError("Couldn't find requested place", 404);
  }

  res.json({ place });
}

function getPlaceByUser(req, res, next) {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter((p) => {
    return p.creator === userId;
  });

  if (!places || places.length === 0) {
    return next(new HttpError("Couldn't find requested user", 404));
  }

  res.json({ places });
}

async function createPlace(req, res, next) {
    const {title, description, coordinates, address, creator, image} = req.body
    const error = validationResult(req)
    if(!error.isEmpty){
      throw new HttpError("Invalid inputs, please try again", 422);
    }
    const createdPlace = new Place({
      title,
      description,
      location: coordinates,
      image,
      address,
      creator,
    }) 

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

function modifyPlace(req, res, next) {
  const error = validationResult(req);
  if (!error.isEmpty) {
    throw new HttpError("Invalid inputs, please try again", 422);
  }
  const { title, description} = req.body;
  const placeId = req.params.pid;

  const updatedPlace = {...DUMMY_PLACES.find(p => p.id === placeId)}
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  updatedPlace.title = title
  updatedPlace.description = description

  DUMMY_PLACES[placeIndex] = updatedPlace
  res.status(200).json({DUMMY_PLACES})
}

function deletePlace(req, res, next) {
  const placeId = req.params.pid;
  
  DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId)

  res.status(200).json({ DUMMY_PLACES });
}

exports.getPlaceById = getPlaceById;
exports.getPlaceByUser = getPlaceByUser;
exports.createPlace = createPlace;
exports.modifyPlace = modifyPlace;
exports.deletePlace = deletePlace;
