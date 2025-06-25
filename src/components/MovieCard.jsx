import React from "react";
import { Star, Heart } from "lucide-react";
import { Link } from "react-router";
const MovieCard = ({
  title,
  img,
  year,
  rating,
  id,
  setFavoriteList,
  favoriteList,
}) => {
  const yearOnly = year.slice(0, 4);
  const ratingSlice = rating.toFixed(1);

  const handleFavorite = () => {
    setFavoriteList((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  return (
    <Link to={`/movie/${id}`}>
      <div className="movie-card">
        <div
          className="favorite-icon"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleFavorite();
          }}
        >
          <Heart
            fill={favoriteList.includes(id) ? "red" : "none"}
            color="red"
          />
        </div>
        <div className="movie-img-container">
          {img ? (
            <img
              src={`https://image.tmdb.org/t/p/w200${img}`}
              alt={title}
              className="movie-img"
            />
          ) : (
            <div className="image-placeholder">No Image</div>
          )}
        </div>
        <div className="movie-card-info">
          <h5>{title.length > 20 ? `${title.slice(0, 20)}...` : title}</h5>
          <div className="movie-card-info-flex">
            <p>{yearOnly}</p>
            <span className="movie-card-info-rating">
              <Star className="movie-rating-star" />
              {ratingSlice}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
