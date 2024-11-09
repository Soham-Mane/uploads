const express = require('express');
const router = express.Router();
const Tournament = require('../models/Tournament');
const multer = require('multer');
const path = require('path');
const app = express();
// Set up multer storage for file uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Create unique filename
  },
});

const upload = multer({ storage });

// Create a new tournament with image upload
router.post('/tournaments', upload.single('image'), async (req, res) => {
  const { name, id, sdate, edate } = req.body;
  
  // Construct the tournament object including the image path
  const tournament = new Tournament({
    name,
    id,
    sdate,
    edate,
    image: req.file ? req.file.path : null,  // Save image path if available
    teams: [],
  });

  try {
    const savedTournament = await tournament.save();
    res.status(201).json(savedTournament);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add teams to a tournament
router.post('/tournaments/:id/teams', async (req, res) => {
  const { name, wins, losses, matches, points } = req.body;
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found' });
    }

    const newTeam = { name, wins, losses, matches, points };
    tournament.teams.push(newTeam);
    await tournament.save();

    res.status(200).json(tournament);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all tournaments
router.get('/tournaments', async (req, res) => {
  try {
    const tournaments = await Tournament.find();
    res.status(200).json(tournaments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
