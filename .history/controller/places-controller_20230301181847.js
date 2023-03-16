function getPlaceById(req, res, next) {
    const placeId = req.params.pid
    const place = DUMMY_PLACES.find((p) => {return p.id === placeId})

    if(!place){
        throw new HttpError("Couldn't find requested place", 404);
    }

    res.json({place})
}

function getPlaceByUser(req, res, next) {
    const userId = req.params.uid
    const user = DUMMY_PLACES.find((p) => {return p.creator === userId})

    if (!user) {
      return next(
        new HttpError("Couldn't find requested user", 404)
      ) 
    }

    res.json({user})
}