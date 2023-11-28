import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { addReview } from '../api'
import '../Form.css'
import '../Button.css'

export default function AddReview() {
    let { movieId } = useParams(); // Extract the movie ID from the URL

    const [data, setData] = useState({ author: '', rating: 10, text: '' });
    const [message, setMessage] = useState('Error')
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setShowError(false);
        try {
            console.log(movieId, data.author, data.text, data.rating)
            const res = await addReview(movieId, {
                author: data.author,
                text: data.text,
                rating: data.rating,
            });

            if (res.error) {
                setShowError(true);
                setMessage(res.error);
                setLoading(false);
            } else {
                window.location.reload();
            }

        } catch (err) {
            console.error(err.message);
            setLoading(false);
            setShowError(true);
        }
    }

    return (
        <div className="page-container">
            <div className="form-container">
                <h2>Add Review</h2>
                <form className="add-movie-form" onSubmit={handleSubmit}>
                    <label htmlFor="author">Author</label>
                    <input className="inputFields" value={data.author} onChange={(e) => setData({ ...data, author: e.target.value })} id="author" placeholder='John Doe' required />
                    <label htmlFor="rating">Rating</label>
                    <input
                        className="inputFields"
                        value={data.rating}
                        onChange={(e) => {
                            let newValue = parseInt(e.target.value, 10);
                            if (!isNaN(newValue) && newValue >= 0 && newValue <= 10) {
                                setData({ ...data, rating: newValue });
                            }
                        }}
                        id="rating"
                        type="number"
                        min="0"
                        max="10"
                        required
                    />
                    <label htmlFor="text">Description</label>
                    <textarea
                        className="textArea"
                        value={data.text}
                        onChange={(e) => setData({ ...data, text: e.target.value })}
                        placeholder="Insert description here"
                        rows={4}
                        id="text"
                    ></textarea>
                    {loading &&
                        <LoadingSpinner />
                    }
                    {showError &&
                        <p className="errorMessage">{message}</p>
                    }
                    <div className="BtnContainer">
                        <button className="button" disabled={loading} type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
