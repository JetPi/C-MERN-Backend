const express = require("express");
const {check} = require('express-validator')
const {getPlaceById, getPlaceByUser, createPlace, modifyPlace, deletePlace} = require('../controller/places-controller')
 
const router = express.Router();

//Get place
router.get("/:pid", getPlaceById);

//Get place by user
router.get("/user/:uid", getPlaceByUser);

//Post a new place
router.post("/", [
    check('title').not().isEmpty(),
    check('description').isLength({min: 5}),
    check('address').not().isEmpty(),
], createPlace);

//Modify place
router.patch("/:pid", modifyPlace);

//Delete place
router.delete("/:pid", deletePlace);

module.exports = router;