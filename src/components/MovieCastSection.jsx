import React from "react";

const MovieCastSection = ({ cast }) => {
  return (
    <>
      <hr className="divider" />
      {/*Cast*/}
      <h5 className="cast-h5">Cast</h5>

      <div className="movie-details-cast">
        {cast.slice(0, 6).map((actor) => (
          <div key={actor.id}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                  : "/placeholder.png"
              }
              alt={actor.name}
            />
            <p className="actor-name">{actor.name}</p>
            <p className="actor-role">{actor.character}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default MovieCastSection;
