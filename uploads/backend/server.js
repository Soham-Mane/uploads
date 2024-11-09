const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const multer = require('multer');

const bodyParser = require('body-parser');
const path = require('path');
const { fstat } = require('fs');
const csv = require('csvtojson');
const csvParser = require('csv-parser');

const tournamentRoutes = require('./routes/tournament');
const seriesRoutes = require('./routes/series'); 
const overallseriesRoutes = require('./routes/overallseries'); 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// To parse JSON request bodies

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

  app.use('/api', tournamentRoutes);
  app.use('/api', seriesRoutes);
  app.use('/api', overallseriesRoutes);
  app.use('/uploads', express.static('uploads'));

// Upload csv and blog image 
const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  description: String,
  imagePath: String,
  category: String,
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the current date and time when a new post is created
  }, // Will store the file path for the uploaded image
});
const Blog = mongoose.model('Blog', blogSchema);

// RANKING DATABASE
const PlayerSchema = new mongoose.Schema({
  format: String,
  category: String,
  playerName: String,
  countryName: String,
  ranking: Number,
});

const Player = mongoose.model('Player', PlayerSchema);

// Set up Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
// CSV UPLOAD
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv') {
      cb(null, true); // Accept CSV files only
    } else {
      cb(new Error('Only CSV files are allowed!'), false);
    }
  },
});
// IMAGE UPLOAD FUNCTION USED LATER IN POST METHOD
const uploadImage = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Check if the file is an image (mimetypes starting with 'image/')
    if (file.mimetype.startsWith('image/')) {
      cb(null, true); // Accept image files
    } else {
      cb(new Error('Only image files are allowed!'), false); // Reject non-image files
    }
  },
});


// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.post('/api/blogs', uploadImage.single('image'), async (req, res) => {
  const { title, description, content, category } = req.body;
  const imagePath = req.file ? req.file.path : null; // Handle image path if it exists

  // Check if required fields are provided
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and Content are required' });
  }

  try {
    const newBlog = new Blog({ title,description, content, imagePath, category });
    await newBlog.save();
    console.log(newBlog)
    res.status(201).json({ message: 'Blog post created successfully', blog: newBlog });
  } catch (err) {
    console.error('Error saving blog:', err);
    res.status(500).json({ error: 'Failed to create blog post' });
  }
});

// POST ENDPOINT TO UPLOAD CSV AND INSER DATA INTO MONGODB
// Route to handle CSV upload and save data to MongoDB
app.post('/upload-csv', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  const filePath = req.file.path;
  const players = [];

  // Read and parse CSV file
  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (row) => {
      console.log('Parsed Row:', row); // Log each parsed row to verify CSV structure
      
      const player = {
        format: row.format,
        category: row.category,
        playerName: row.playerName,
        countryName: row.countryName,
        ranking: parseInt(row.ranking, 10),
      };
      players.push(player);
    })
    .on('end', () => {
      console.log('Parsed Players:', players); // Log all parsed players

      // Delete all previous entries from MongoDB
      Player.deleteMany({})
        .then(() => {
          // Insert parsed data into MongoDB
          return Player.insertMany(players);
        })
        .then(() => {
          console.log('Data saved to MongoDB');
          res.status(200).send('CSV data successfully uploaded and saved to MongoDB');
        })
        .catch((err) => {
          console.error('Error saving data to MongoDB:', err);
          res.status(500).send('Error saving data to MongoDB: ' + err.message);
        });
    })
    .on('error', (err) => {
      console.error('Error reading CSV file:', err);
      res.status(500).send('Error reading the CSV file: ' + err.message);
    });
});
// Fetch all player data from MongoDB
app.get('/players', async (req, res) => {
  try {
    const players = await Player.find(); // Fetch all players from the collection
    res.status(200).json(players); // Send back the data as JSON
  } catch (err) {
    console.error('Error fetching data from MongoDB:', err);
    res.status(500).send('Error fetching data from MongoDB: ' + err.message);
  }
});
app.get('/rankings/:category/:format', async (req, res) => {
  const { category, format } = req.params;
  try {
    const rankings = await Player.find({ category, format });
    res.json(rankings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rankings' });
  }
});
// GET endpoint to retrive all posts
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find(); // Assuming 'Blog' is your MongoDB model
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching blogs' });
  }
});

// GET endpoint to retrieve single post
app.get('/api/blogs/:id', async (req, res) => {
  try {
    // Use async/await with findById
    const blog = await Blog.findById(req.params.id);

    // Check if the blog exists
    if (!blog) {
      return res.status(404).send('Blog not found');
    }

    // Send the blog data in the response
    res.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error); // Log the error for debugging
    res.status(500).send('Server error'); // Send an error response
  }
});

// Listen to the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

