import React from "react";
import { Video } from "lucide-react";
const MovieActions = ({
  trailerUrl,
  handleTrailerClick,
  title,
  handleFavoriteClick,
  id,
  favoriteList,
}) => {
  const normalizedId = Number(id);
  return (
    <div className="movie-details-buttons">
      <button
        onClick={handleTrailerClick}
        className="trailer-button"
        disabled={!trailerUrl}
      >
        <Video size={13} aria-label={`Movie trailer for ${title}`} />
        Trailer
      </button>
      <button className="favorite-button" onClick={handleFavoriteClick}>
        {favoriteList.includes(normalizedId)
          ? "Remove from Favorite"
          : "Favorite"}
      </button>
    </div>
  );
};

export default MovieActions;
