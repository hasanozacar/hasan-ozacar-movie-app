import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';
import { Movie, MovieDetails, ApiResponse } from './types';

interface MoviesState {
  movies: Movie[];
  totalResults:string;
  selectedMovie: MovieDetails | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: MoviesState = {
  movies: [],
  selectedMovie: null,
  status: 'idle',
  totalResults:"0",
};

const apiKey = "40e0fb8";

export const fetchMoviesAsync = createAsyncThunk<ApiResponse, { searchTerm: string; year: string; page: number }>(
  'movies/fetchMovies',
  async ({ searchTerm, year, page }) => {
    const response = await axios.get<ApiResponse>(`http://www.omdbapi.com/?s=${searchTerm}&y=${year}&page=${page}&apikey=${apiKey}`);
    return response.data;
  }
);

export const fetchMovieDetailsAsync = createAsyncThunk<MovieDetails, string>(
  'movies/fetchMovieDetails',
  async (id) => {
    const response = await axios.get<MovieDetails>(`http://www.omdbapi.com/?i=${id}&apikey=${apiKey}`);
    return response.data;
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMoviesAsync.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
        state.status = 'idle';
        state.movies = action.payload.Search || []; // Update movies array
        state.totalResults = action.payload.totalResults; // Update movies array
      })
      .addCase(fetchMoviesAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchMovieDetailsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovieDetailsAsync.fulfilled, (state, action: PayloadAction<MovieDetails>) => {
        state.status = 'idle';
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieDetailsAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectMovies = (state: RootState) => state.movies.movies;
export const selectMovieDetails = (state: RootState) => state.movies.selectedMovie;
export const selectStatus = (state: RootState) => state.movies.status;
export const selectTotalResults= (state: RootState) => state.movies.totalResults;

export default movieSlice.reducer;
