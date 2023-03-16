const HttpError = require('../models/http-error')
const uuid = require('uuid/v4')

const DUMMY_PLACES = [
  {
    id: uuid(),
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
  const user = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });

  if (!user) {
    return next(new HttpError("Couldn't find requested user", 404));
  }

  res.json({ user });
}

function createPlace(req, res, next) {
    const {title, description, coordinates, address, creator} = req.body
    const createdPlace = {
        title,
        description,
        location: coordinates,
        address,
        creator,
    }

    DUMMY_PLACES.push(createdPlace)
    res.status(201).json({place: createdPlace})
}

exports.getPlaceById = getPlaceById;
exports.getPlaceByUser = getPlaceByUser;
exports.createPlace = createPlace;
