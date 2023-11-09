import React, { useEffect, useState } from "react";
import MovieLI from "./MovieLI";
import Button from "@mui/material/Button";
import "./Discover.css";

export default function Discover({ setMovieById, setActorDetails }) {
  const [discover, setDiscover] = useState([]);
  const [page, setPage] = useState(1);

  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setDiscover(data.results));
  }, [page]);

  function handleNextPage() {
    setPage((prevPage) => prevPage + 1);
  }

  function handlePrevPage() {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  }

  return (
    <div className="movies-list">
      {discover.map((movie) => (
        <MovieLI
          setActorDetails={setActorDetails}
          key={movie.id}
          movie={movie}
          setMovieById={setMovieById}
        />
      ))}
      <footer>
        <Button
          variant="contained"
          onClick={handlePrevPage}
          disabled={page === 1}
        >
          Prev
        </Button>
        <Button
          style={{ marginLeft: "8px" }}
          variant="contained"
          onClick={handleNextPage}
        >
          Next
        </Button>
      </footer>
    </div>
  );
}
