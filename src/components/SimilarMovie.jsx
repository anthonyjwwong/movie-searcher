import React from "react";
import { Link } from "react-router-dom";

const SimilarMovie = ({ similarMovies }) => {
  return (
    <div className="similar-movie-section">
      <h5>Similar Movies</h5>
      <div className="similar-movie-container">
        <div className="similar-movie">
          {similarMovies.slice(0, 8).map((movie) => {
            return (
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.original_title}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SimilarMovie;
