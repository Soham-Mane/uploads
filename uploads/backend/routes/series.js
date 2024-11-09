const express = require('express');
const router = express.Router();
const Series = require('../models/Series');

// Add a new series with offset
router.post('/series', async (req, res) => {
  const { name, offset } = req.body;

  try {
    const newSeries = new Series({ name, offset });
    await newSeries.save();
    res.status(201).json(newSeries);
  } catch (error) {
    res.status(500).json({ message: 'Error creating series', error: error.message });
  }
});

// Get all series
router.get('/series', async (req, res) => {
  try {
    const series = await Series.find();
    res.json(series);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching series', error: error.message });
  }
});

// Delete a series by ID
router.delete('/series/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSeries = await Series.findByIdAndDelete(id);
    if (!deletedSeries) {
      return res.status(404).json({ message: 'Series not found' });
    }
    res.json({ message: 'Series deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting series', error: error.message });
  }
});

module.exports = router;
