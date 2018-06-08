const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// Return a list of all films. (/api/films)

router
  .route('/')
  .get((req, res) => {
    const { producer, released } = req.query;
    let query = Film.find()
      .sort({ episode: 1 })
      .select('episode title planets characters producer release_date')
      .populate('characters', `_id name gender height skin_color hair_color eye_color`)
      .populate('planets', `name climate terrain gravity diameter`)
    if (producer !== undefined) {
      const producerFilter = new RegExp(producer, 'i')
      query.where({ producer: producerFilter })
    }
    if (released !== undefined) {
      query.where({ release_date: { $regex: released, $options: 'i' }})
    }
    query.then( films => {
      res.status(200).json(films);
    })
    query.catch( err => {
      res.status(500).json({ error: 'Error getting films', err});
    })
  });

// * order by episode.
// * populate character information.
//   * only include: `_id, name, gender, height, skin_color, hair_color and eye_color`.
// * populate planets, include: `name, climate, terrain, gravity and diameter`.

// Find all films produced by _Gary Kurtz_ (/api/films?producer=gary+kurtz)

// Find all films released in _2005_. (/api/films?released=2005)



module.exports = router;
