const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Vehicle = new mongoose.Schema({
  vehicle_class: String,
  pilot_keys: [Number],
  key: { type: Number, unique: true },
  pilots: [{
    type: ObjectId,
    res: 'Character'
  }]
});

module.exports = mongoose.model('Vehicle', Vehicle);
