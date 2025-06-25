import React from "react";
import { Star } from "lucide-react";
const MovieHeader = ({ movie }) => {
  const movieYear = movie?.release_date.slice(0, 4);
  const ratingSlice = movie?.vote_average.toFixed(1);
  return (
    <div className="movie-details-container">
      <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} />
      <div className="movie-details">
        <h3>{movie.original_title}</h3>
        <div className="movie-details-info">
          <div>
            <span>
              <Star size={13} className="star" />
              {ratingSlice}
            </span>
            <p>{movieYear}</p>
            <p>{movie.runtime} mins</p>
          </div>
          <div>
            {movie &&
              movie.genres.map((genre) => {
                return <p key={genre.id}>{genre.name}</p>;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieHeader;
