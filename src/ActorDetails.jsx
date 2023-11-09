import "./ActorDetails.css";

import MovieLI from "./MovieLI";

export default function ActorDetails({
  actorDetails,
  setMovieById,
  setActorDetails,
}) {
  return (
    <div className="actor-movies">
      {actorDetails.cast.map((movie) => {
        return (
          <div key={movie.id}>
            <MovieLI
              setActorDetails={setActorDetails}
              movie={movie}
              setMovieById={setMovieById}
            />
          </div>
        );
      })}
    </div>
  );
}
