const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: String,
  wins: Number,
  losses: Number,
  matches: Number,
  points: Number,
});

const tournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  teams: [teamSchema],
  id: { type: Number, required: true },
  sdate: { type: Date },
  edate: { type: Date },
  image: { type: String },  // Added image field to store the image path
});

module.exports = mongoose.model('Tournament', tournamentSchema);
