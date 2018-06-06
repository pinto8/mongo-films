const express = require('express');

const Specie = require('./Specie.js');

const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    Specie.find()
      .then( species => {
        res.status(200).json(species);
      })
      .catch( err => {
        res.status(500).json({ error: 'Error getting species', err});
      })
    })

module.exports = router;
