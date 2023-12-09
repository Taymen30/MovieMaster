import React, { useEffect, useState } from "react";
import MovieLI from "./MovieLI";
import Button from "@mui/material/Button";
import "./Discover.css";

export default function Discover({ setMovieById, setActorDetails }) {
  const [pageMultiplier] = useState(5);
  const [discover, setDiscover] = useState([]);
  const [page, setPage] = useState(1);
  const [pageEx, setPageEx] = useState(pageMultiplier);

  useEffect(() => {
    const fetchMovies = async () => {
      const apiKey = process.env.REACT_APP_API_KEY;
      const allMovies = [];
      for (let i = page; i <= pageEx; i++) {
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${i}`;
        const response = await fetch(url);
        const data = await response.json();
        allMovies.push(...data.results);
      }
      setDiscover(allMovies);
    };

    fetchMovies();
  }, [page]);

  function handleNextPage() {
    setPage((prevPage) => prevPage + pageMultiplier);
    setPageEx((prevPageEx) => prevPageEx + pageMultiplier);
  }

  function handlePrevPage() {
    if (page > 1) {
      setPage((prevPage) => prevPage - pageMultiplier);
      setPageEx((prevPageEx) => prevPageEx - pageMultiplier);
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
