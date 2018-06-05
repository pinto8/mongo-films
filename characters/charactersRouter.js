const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    Character.find()
      .then( characters => {
        console.log(characters);
        res.status(200).json(characters);
      })
      .catch( err => {
        res.status(500).json({ error: 'Error getting chars', err});
      })
    })


module.exports = router;
