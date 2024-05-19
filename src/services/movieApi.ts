import axios from 'axios';

const API_KEY = 'your_api_key';
const BASE_URL = 'http://www.omdbapi.com/';

export const fetchMovies = async (searchTerm: string, page: number = 1) => {
  const response = await axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      s: searchTerm,
      page,
      type: 'movie',
    },
  });
  return response.data;
};

export const fetchMovieDetails = async (imdbID: string) => {
  const response = await axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      i: imdbID,
    },
  });
  return response.data;
};
