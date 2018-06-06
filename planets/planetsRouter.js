const express = require('express');

const Planet = require('./Planet.js');

const router = express.Router();

// Given a planet Id find all `characters` born in that planet and all native `species`. (/api/planet/:id)

router
    .route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      query = Planet.findById(id)
        .then( planet => {
          if (planet !== null) {
            res.status(200).json(planet);
          } else {
            res.status(404).json({error: 'There are no planets with that ID.' })
          }
        })
        .catch( err => {
          res.status(500).json({error: 'Error retrieving planet from database', err});
        })
    })

module.exports = router;
