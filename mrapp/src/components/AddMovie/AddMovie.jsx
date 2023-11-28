import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { addMovie } from '../api'
import '../Form.css'
import '../Button.css'

export default function AddMovie() {

    const navigate = useNavigate();

    const [data, setData] = useState({ title: '', year: 2008, genre: '', description: '' });
    const [message, setMessage] = useState('Error')
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setShowError(false);
        try {
            const res = await addMovie(data);
            if (res.error) {
                setShowError(true);
                setMessage(res.error);
                setLoading(false);
            } else {
                navigate(`/${res._id}`);
            }

        } catch (err) {
            console.error(err);
            setLoading(false);
            setShowError(true);
        }
    }

    return (
        <div className="page-container">
            <div className="form-container">
                <h2>Add Movie</h2>
                <form className="add-movie-form" onSubmit={handleSubmit}>
                    <label htmlFor="title">Title</label>
                    <input className="inputFields" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} id="title" placeholder='Let the Right One In' required />
                    <label htmlFor="year">Year</label>
                    <input className="inputFields" value={data.year} onChange={(e) => setData({ ...data, year: e.target.value })} id="year" type="number" required />
                    <label htmlFor="genre">Genre</label>
                    <input className="inputFields" value={data.genre} onChange={(e) => setData({ ...data, genre: e.target.value })} id="genre" placeholder="Horror, Thriller etc." required />
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="textArea"
                        value={data.description}
                        onChange={(e) => setData({ ...data, description: e.target.value })}
                        placeholder="Insert description here"
                        rows={4}
                        id="description"
                    ></textarea>
                    {loading &&
                        <LoadingSpinner />
                    }
                    {showError &&
                        <p className="errorMessage">{message}</p>
                    }
                    <div className="BtnContainer">
                        <button className="button" disabled={loading} type="submit">Add Movie</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
