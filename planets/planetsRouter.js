const express = require('express');

const Planet = require('./Planet.js');
const Specie = require('../species/Specie.js');
const Character = require('../characters/Character.js')

const router = express.Router();

// Given a planet Id find all `characters` born in that planet and all native `species`. (/api/planet/:id)

router
    .route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      const species = Specie.find({ homeworld: id })
      const chars = Character.find({ homeworld: id })

      Promise.all([species, chars])
        .then(speciesAndChars => {
            if (speciesAndChars !== null) {
              res.status(200).json({ speciesAndChars });
            } else {
              res.status(404).json({error: 'There are no species or characters native to that planet.' })
            }
          })
        .catch( err => {
          res.status(500).json({error: 'Error retrieving species/characters from database', err});
        })
    })

module.exports = router;
