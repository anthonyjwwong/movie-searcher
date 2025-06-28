import React, { useState, useEffect } from "react";
import { getMovieDetailsById } from "../services/tmdbApi";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";
import Error from "../components/Error";

const FavoritePage = ({ favoriteList, setFavoriteList }) => {
  const [movies, setMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getFavMovie = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const results = await Promise.all(
        favoriteList.map((id) => getMovieDetailsById(id))
      );
      setMovies(results);
    } catch (error) {
      setError("Failed to Load Favorite List:", error);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (favoriteList.length > 0) {
      getFavMovie();
    } else {
      setMovies([]);
    }
  }, [favoriteList]);

  return (
    <div className="favorite-page">
      {isLoading && <Loading />}

      {error && !isLoading && <Error message={error} />}
      {!isLoading && !error && movies.length === 0 && (
        <p className="no-fav-msg">No favorites added yet.</p>
      )}
      {!isLoading && !error && (
        <div className="favorite-container">
          {movies.map((movie) => (
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
    </div>
  );
};

export default FavoritePage;
