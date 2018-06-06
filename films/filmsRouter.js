const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// Return a list of all films. (/api/films)

router
  .route('/')
  .get((req, res) => {
    Film.find()
      .then( films => {
        console.log(Film);
        res.status(200).json(films);
      })
      .catch( err => {
        res.status(500).json({ error: 'Error getting films', err});
      })
    })
  
  .post((req, res) => {
    const filmData = req.body;
    const { title } = req.body.title;
    const film = new Film(filmData);
    film.save()
      .then( film => {
        res.status(201).json(film);
      })
      .catch( err => {
        res.status(500).json({error: 'Error posting to database', err});
      })
  });

    

// * order by episode.
// * populate character information.
//   * only include: `_id, name, gender, height, skin_color, hair_color and eye_color`.
// * populate planets, include: `name, climate, terrain, gravity and diameter`.

// Find all films produced by _Gary Kurtz_ (/api/films?producer=gary+kurtz)

// Find all films released in _2005_. (/api/films?released=2005)



module.exports = router;
