const express = require('express');
const router = express.Router();
const OverallSeries = require('../models/OverallSeries');

// Add a new overall series
router.post('/overall-series', async (req, res) => {
  const { name, overallId } = req.body;

  if (!name || !overallId) {
    return res.status(400).json({ message: 'Name and Overall ID are required' });
  }

  try {
    const newSeries = new OverallSeries({ name, overallId });
    await newSeries.save();
    res.status(201).json(newSeries);
  } catch (error) {
    res.status(500).json({ message: 'Error creating overall series', error: error.message });
  }
});

// Get all overall series
router.get('/overall-series', async (req, res) => {
  try {
    const series = await OverallSeries.find();
    res.json(series);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching overall series', error: error.message });
  }
});

// Delete an overall series by ID
router.delete('/overall-series/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSeries = await OverallSeries.findByIdAndDelete(id);
    if (!deletedSeries) {
      return res.status(404).json({ message: 'Overall series not found' });
    }
    res.json({ message: 'Overall series deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting overall series', error: error.message });
  }
});

module.exports = router;
