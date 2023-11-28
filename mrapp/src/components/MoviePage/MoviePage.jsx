import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieById, getReviews } from '../api';
import AddReview from '../AddReview/AddReview';

function MoviePage() {
    const navigate = useNavigate();
    let { movieId } = useParams();
    const [movieData, setMovieData] = useState(null);
    const [reviewData, setReviewData] = useState([]);
    const [averageRating, setAverageRating] = useState(null);
    const [showReview, setShowReview] = useState(false);

    const fetchMovie = async () => {
        try {
            const res = await fetchMovieById(movieId);
            setMovieData(res);
            if (!res) {
                window.alert("Movie does not excist, please add movie!")
                navigate('/add-movie');
            }
        } catch (error) {
            console.error("Error fetching movie data:", error.message);
            window.alert("Could not Connect to backend!")
            navigate('/home');
        }
    };

    const fetchReviews = async () => {
        await getReviews(movieId)
            .then((res) => {
                setReviewData(res);

                if (res.length) {
                    const totalRating = res.reduce((acc, review) => acc + review.rating, 0);
                    const avgRating = totalRating / res.length;
                    setAverageRating(avgRating);
                    console.log("AVG:", avgRating);
                }
            })
            .catch((error) => {
                console.error("Error fetching review data:", error);
            });
    };

    useEffect(() => {
        if (movieId) {
            fetchMovie();
            fetchReviews();

        }
    }, [movieId]);

    return (
        <div>
            {!movieData ?
                <LoadingSpinner /> :
                <div className="page-container">
                    <div className="form-container" style={{ width: '50%' }}>
                        <h1>{movieData.title}</h1>
                        <p><strong>Genre:</strong> {movieData.genre}</p>
                        <p><strong>Year:</strong> {movieData.year}</p>
                        {averageRating ? <p><strong>Avg Rating:</strong> {averageRating.toFixed(1)} </p> : null}
                        <p> {movieData.description}</p>
                    </div>
                    {!showReview ? (
                        <div className="BtnContainer">
                            <button className="button" onClick={() => setShowReview(true)}>Add Review</button>
                        </div>
                    ) : (
                        <AddReview />
                    )}
                    <ul>
                        {reviewData.map((review) => (
                            <li key={review._id}>
                                <div className="page-container" >
                                    <div className="form-container" style={{ width: '50%', margin: 0, marginBottom: '2rem' }}>
                                        <p><strong>By:</strong> {review.author}</p>
                                        <p><strong>Rating:</strong> {review.rating}</p>
                                        {review.text ? <p>{review.text}</p> : null}

                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

            }
        </div>

    );
}

export default MoviePage;
