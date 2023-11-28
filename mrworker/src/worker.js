const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const port = 8000;

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // For parsing application/json

const Movie = require('./movie'); // Import the Movie model

// Connect to MongoDB
const mongoDBURL = 'mongodb://mongodb-service:27017/moviesdb';

mongoose.connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log("We are connected to the database!");
});

// Start the server
app.listen(port, () => {
    console.log(`Worker service listening on port ${port}`);
});


// Status Check
app.get('/api/status', async (req, res) => {
    try {
        res.json({ message: "Woring on port: " + port });
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET endpoint to fetch all movies
app.get('/api/movies', async (req, res) => {
    try {
        const movies = await Movie.find(); // Retrieve all movies from the database
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET endpoint to get a movie by id
app.get('/api/movies/:id', async (req, res) => {
    try {
        const movieId = req.params.id;
        const movie = await Movie.findById(movieId);

        if (!movie) {
            return res.status(404).send('Movie not found');
        }

        res.json(movie);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// POST endpoint to add a new movie
app.post('/api/add-movie', async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.title === 1) {
            // Duplicate key error (title is not unique)
            res.status(400).json({ error: 'Title must be unique' });
        } else {
            // Other errors
            res.status(500).send(error);
        }
    }
});

app.post('/api/add-review/:movieId', async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const reviewData = req.body;

        // Find the movie by its unique identifier
        const movie = await Movie.findOne({ _id: movieId });

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        // Add a new review to the movie's reviews array
        movie.reviews.push(reviewData);

        // Save the updated movie document
        await movie.save();

        res.status(201).json(movie);
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET endpoint to fetch reviews for a specific movie
app.get('/api/:movieId/reviews', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.movieId);
        res.status(200).send(movie.reviews);
    } catch (error) {
        res.status(500).send(error);
    }
});



