const mongoose = require('mongoose');

const overallSeriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  overallId: { 
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const OverallSeries = mongoose.model('OverallSeries', overallSeriesSchema);

module.exports = OverallSeries;
