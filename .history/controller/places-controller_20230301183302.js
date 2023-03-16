const HttpError = require('../models/http-error')

const DUMMY_PLACES = [
  {
    id: "p1",
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
    const {title, description, location, address, creator} = req.body
    const createdPlace = {
        title: title,
        description: description,
        location: location,
        address: address,
        creator: creator,
    }
    res.json("")
}

exports.getPlaceById = getPlaceById;
exports.getPlaceByUser = getPlaceByUser;
exports.createPlace = createPlace;
