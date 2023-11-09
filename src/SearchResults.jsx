import MovieLI from "./MovieLI";
import "./Discover.css";

export default function SearchResults({
  setActorDetails,
  setMovieById,
  searchRes,
}) {
  return (
    <div className="movies-list">
      {searchRes.map((movie) => (
        <MovieLI
          key={movie.id}
          setActorDetails={setActorDetails}
          setMovieById={setMovieById}
          movie={movie}
        />
      ))}
    </div>
  );
}
