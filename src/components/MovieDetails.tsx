import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieDetailsAsync, selectMovieDetails, selectStatus } from '../redux/movieSlice';
import { RootState, AppDispatch } from '../redux/store';
import { CircularProgress, Button } from '@mui/material';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id?: string }>(); // Make id optional
  const dispatch: AppDispatch = useDispatch();
  const movie = useSelector(selectMovieDetails);
  const status = useSelector(selectStatus);

  useEffect(() => {
    if (id) { // Check if id is not undefined
      dispatch(fetchMovieDetailsAsync(id));
    }
  }, [dispatch, id]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 text-2xl">Movie not found.</p>
        <Button component={Link} to="/" variant="contained" className="mt-4">
          Back to Movie List
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-4xl">
        <div className="border rounded-lg overflow-hidden shadow-md p-4 bg-gray-100">
          <h2 className="text-2xl font-bold mb-4 text-center">{movie.Title}</h2>
          <div className="flex justify-center mb-4">
            <img src={movie.Poster} alt={movie.Title} className="max-w-full h-auto" />
          </div>
          <p className="text-lg flex justify-center mb-2"><span className="font-bold">Duration:</span> {movie.Runtime}</p>
          <p className="text-lg flex justify-center  mb-2"><span className="font-bold">Genre:</span> {movie.Genre}</p>
          <p className="text-lg flex justify-center  mb-2"><span className="font-bold">Director:</span> {movie.Director}</p>
          <p className="text-lg flex justify-center  mb-2"><span className="font-bold">Cast:</span> {movie.Actors}</p>
          <p className="text-lg flex justify-center  mb-2"><span className="font-bold">IMDb Rating:</span> {movie.imdbRating}</p>
        </div>
        <Button component={Link} to="/" variant="contained" className="mt-4 top-4">
          Back to Movie List
        </Button>
      </div>
    </div>
  );
};

export default MovieDetails;
