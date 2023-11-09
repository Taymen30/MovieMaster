import React, { useState, useEffect } from "react";

const apiKey = process.env.REACT_APP_API_KEY;

export default function Trailer({ movieId }) {
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        const trailer = data.results.find(
          (result) => result.type === "Trailer"
        );
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      })
      .catch((error) => console.error("Error fetching trailers:", error));
  }, [movieId]);

  if (!trailerKey) {
    return null;
  }

  return (
    <div className="trailer">
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${trailerKey}`}
        title="Trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
}
