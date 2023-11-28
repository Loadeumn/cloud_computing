const mongoose = require('mongoose');
const { Schema } = mongoose;

// Current year for validation
const currentYear = new Date().getFullYear();

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        maxlength: [50, 'Title can not be more than 50 characters'] // Max length for title
    },
    year: {
        type: Number,
        required: true,
        validate: {
            validator: function (yearValue) {
                return yearValue <= currentYear;
            },
            message: `Year must be less than or equal to the current year (${currentYear})`
        }
    },
    genre: {
        type: String,
        required: true,
        maxlength: [30, 'Genre can not be more than 30 characters'] // Max length for genre
    },
    description: {
        type: String,
        maxlength: [500, 'Description can not be more than 500 characters'] // Max length for description
    },
    reviews: [{
        author: {
            type: String,
            maxlength: [50, 'Author cannot be more than 50 characters'] // Max length for author
        },
        text: {
            type: String,
            maxlength: [500, 'Text cannot be more than 500 characters'] // Max length for text
        },
        rating: {
            type: Number,
            min: [0, 'Rating cannot be less than 0'],
            max: [10, 'Rating cannot be greater than 10'],
            validate: {
                validator: Number.isInteger,
                message: 'Rating must be an integer between 0 and 10'
            }
        }
    }]
});

movieSchema.index({ title: 1 }, { unique: true });

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
