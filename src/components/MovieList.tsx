import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMoviesAsync,
  selectMovies,
  selectStatus,
  selectTotalResults,
} from "../redux/movieSlice";
import { RootState, AppDispatch } from "../redux/store";
import SearchBar from "./SearchBar";
import YearFilter from "./YearFilter";
import { Link } from "react-router-dom";
import { Pagination, CircularProgress } from "@mui/material";

const MovieList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const movies = useSelector(selectMovies);
  const totalResults = useSelector(selectTotalResults);
  const status = useSelector(selectStatus);
  const [searchTerm, setSearchTerm] = useState("Pokemon" as string); // Varsayılan arama terimi
  const [year, setYear] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    dispatch(fetchMoviesAsync({ searchTerm, year, page })).then((action) => {
      const total = parseInt(totalResults);
      setTotalPages(Math.ceil(total / 10)); // Assuming 10 results per page
    });
  }, [dispatch, searchTerm, page, year, totalResults]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setPage(1);
  };

  const handleYearFilter = (selectedYear: string) => {
    setYear(selectedYear);
    setPage(1);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-4xl">
        <header className="w-full py-4 mb-4 bg-blue-600 text-white text-center">
          <h1 className="text-3xl font-bold">Movie List</h1>
        </header>
        <div className="mb-6 flex justify-between">
          <SearchBar term={searchTerm} onSearch={handleSearch} />
          <YearFilter onYearFilter={handleYearFilter} />
        </div>
        {status === "loading" && (
          <div className="flex justify-center">
            <CircularProgress />
          </div>
        )}
        {status === "failed" && (
          <p className="text-center text-red-500">Error fetching movies.</p>
        )}
        {movies && movies.length > 0 && status === "idle" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies.map((movie) => (
              <div
                key={movie.imdbID}
                className="border rounded-lg overflow-hidden shadow-md"
              >
                <Link to={`/movie/${movie.imdbID}`} className="block">
                  <div className="p-4">
                    <h2 className="text-lg font-semibold">{movie.Title}</h2>
                    <p className="text-sm text-gray-500">{movie.Year}</p>
                    <p className="text-sm text-gray-500">{movie.imdbID}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            {status === "idle" ? "No movies found." : "Loading..."}
          </p>
        )}
        {totalPages > 1 && (
          <div className="mt-4 flex justify-center">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              shape="rounded"
              color="primary"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieList;
