const express = require('express');

const Character = require('./Character.js');
const Vehicle = require('../vehicles/Vehicle.js');

const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    const { gender, height } = req.query;
    let query = Character.find()
    if (gender !== undefined) {
        query.where({ gender: gender })
            .then( chars => res.json(chars))
            .catch( err => res.status(500).json({ error: 'Error getting chars from database', err}))
    }
    if (height !== undefined) {
        query.gt({ height: height})
            .then( chars => res.json(chars))
            .catch( err => res.status(500).json({ error: 'Error getting chars from database', err}))
    } else {
        query.then( chars => res.status(200).json(chars))
            .catch( err => res.status(500).json({ error: 'Error getting chars from database', err}))
    }
});

router
    .route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      Character.findById(id)
        .then( char => {
          if (char !== null) {
            res.status(200).json(char);
          } else {
            res.status(404).json({error: 'There are no characters with that ID.' })
          }
        })
        .catch( err => {
          res.status(500).json({error: 'Error retrieving friend from database', err});
        })
    })

// Find all vehicles driven by a given character. (/api/characters/:id/vehicles)

router
    .route('/:id/vehicles')
    .get((req, res) => {
      const { id } = req.params;
      Vehicle.find({ pilots: id })
        .then(vehicles => {
          if (vehicles !== null) {
            res.status(200).json(vehicles);
          } else {
            res.status(404).json({error: 'There are no vehicles with that character.' })
          }
        })
        .catch( err => {
          res.status(500).json({error: 'Error retrieving vehicles from database', err});
        })
    })

// Find all female characters taller than 100cm (/api/characters?minheight=100)


module.exports = router;
