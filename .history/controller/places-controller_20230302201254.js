const HttpError = require('../models/http-error')
const {v4: uuidv4} = require('uuid')

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
        id: uuidv4(),
        title,
        description,
        location: coordinates,
        address,
        creator,
    }

    DUMMY_PLACES.push(createdPlace)
    res.status(201).json({place: createdPlace})
}

function modifyPlace(req, res, next) {
  const { title, description, coordinates, address, creator, id } = req.body;
  const placeId = req.params.pid;
  const moddedPlace = {
    id,
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  const newPlaces = DUMMY_PLACES.map((p) => {
    let result = p
    if(placeId === p.id){
      result = moddedPlace
    }
    return result
  })

  DUMMY_PLACES = newPlaces
  res.status(200).json({places: DUMMY_PLACES})
}

function deletePlace(req, res, next) {
  const placeId = req.params.pid;
  
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });
  
  if (!place) {
    throw new HttpError("Couldn't find requested place", 404);
  }

  const index = DUMMY_PLACES.indexOf(place)
  DUMMY_PLACES.splice(index, 1)

  res.json({ DUMMY_PLACES });
}

exports.getPlaceById = getPlaceById;
exports.getPlaceByUser = getPlaceByUser;
exports.createPlace = createPlace;
exports.modifyPlace = modifyPlace;
exports.deletePlace = deletePlace;
