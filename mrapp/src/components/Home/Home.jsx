import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { fetchAllMovies } from '../api'; // Import the function to fetch movies from your API
import { PlusIcon } from '../Icons/Icons';

function Home() {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    const handleButtonClick = (path) => {
        navigate(`/${path}`);
    };

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetchAllMovies(); // Make a GET request to fetch all movies
                setMovies(response);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div>
            <ul>
                {movies.map((movie) => (
                    <li key={movie._id}>
                        <div className="page-container">
                            <div className="form-container" style={{ width: '50%' }}>
                                <h1>{movie.title}</h1>
                                <a>{movie.year}</a>
                                {/* <p><strong>Year:</strong> {movie.year}</p>
                                <p><strong>Genre:</strong> {movie.genre}</p>
                                <p><strong>Description:</strong> <br /> {movie.description}</p> */}
                                <div className="BtnContainer">
                                    <button key={movie._id} className="button" onClick={() => handleButtonClick(movie._id)}>Details</button>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="BtnContainer">
                <button className="button" onClick={() => handleButtonClick("add-movie")}><PlusIcon /> Movie</button>
            </div>
        </div>
    );
}

export default Home;
