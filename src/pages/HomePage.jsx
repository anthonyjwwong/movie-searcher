import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import useDebounce from "../hooks/useDebounce";
import { searchMovie, getPopularMovie } from "../services/tmdbApi";
import Error from "../components/Error";
import Loading from "../components/Loading";
const HomePage = ({ favoriteList, setFavoriteList }) => {
  const [movieQuery, setMovieQuery] = useState("");
  const debouncedQuery = useDebounce(movieQuery, 350);
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPopularMovies();
  }, []);

  useEffect(() => {
    if (debouncedQuery) {
      searchMovies(debouncedQuery);
    } else if (movieQuery === "") {
      loadPopularMovies();
    }
  }, [debouncedQuery, movieQuery]);

  const loadPopularMovies = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const list = await getPopularMovie();
      setMovieList(list.results || []);
    } catch (err) {
      setError("Failed to load movies");
      setMovieList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const searchMovies = async (query) => {
    try {
      setIsLoading(true);
      setError(null);
      const list = await searchMovie(query);

      if (!list.results || list.results.length === 0) {
        setError(`No movies found for "${query}"`);
        setMovieList([]);
      } else {
        setMovieList(list.results);
      }
    } catch (err) {
      setError("Search failed. Please try again.");
      setMovieList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className="home-page">
      <div className="hero-section">
        <h3>Discover Movies</h3>
        <SearchBar
          movieQuery={movieQuery}
          onChange={(e) => setMovieQuery(e.target.value)}
          handleSubmit={handleSubmit}
        />
      </div>
      <div className="sorting">
        <button>SORT</button>
      </div>

      {isLoading && <Loading />}

      {error && !isLoading && <Error message={error} />}

      {!isLoading && !error && (
        <div className="movie-container">
          {movieList.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.original_title}
              img={movie.poster_path}
              year={movie.release_date}
              rating={movie.vote_average}
              setFavoriteList={setFavoriteList}
              favoriteList={favoriteList}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default HomePage;
