export default function MovieLI({ movie, setMovieById, setActorDetails }) {
  const apiKey = process.env.REACT_APP_API_KEY;
  function handleClick(e) {
    fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((movie) => {
        setMovieById(movie);

        setActorDetails({});
      });
  }
  return (
    <div key={movie.id} onClick={handleClick}>
      <img
        className="movie-li"
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://www.joblo.com/wp-content/uploads/2008/09/movie-poster-missing-2.jpg"
        }
        alt={movie.id}
      />
    </div>
  );
}
