// Function to add a new movie
const addMovie = async (movieData) => {
    const response = await fetch('/api/add-movie', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
    });
    return response.json();
};


// Function to fetch reviews for a movie
const getReviews = async (movieId) => {
    const response = await fetch(`/api/${movieId}/reviews`);
    return response.json();
};

const fetchMovieById = async (id) => {
    try {
        const response = await fetch(`/api/movies/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching movie data:', error);
        return null;
    }
};

const fetchAllMovies = async () => {
    try {
        const response = await fetch('/api/movies');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
};

const addReview = async (movieId, reviewData) => {
    try {
        const response = await fetch(`/api/add-review/${movieId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const newReview = await response.json();
        return newReview;
    } catch (error) {
        console.error('Error adding review:', error);
        return null;
    }
};

export { addMovie, addReview, getReviews, fetchMovieById, fetchAllMovies };