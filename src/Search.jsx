import { useState } from "react";
import "./Search.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function Search({ setSearchRes }) {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");

  function handleInput(e) {
    setSearch(e.target.value);
  }

  function handleGenreSelect(e) {
    setGenre(e.target.value);
  }

  function handleSearch(e) {
    e.preventDefault();
    const apiKey = process.env.REACT_APP_API_KEY;
    const query = search;
    const genreParam = genre ? `&with_genres=${genre}` : "";

    const genreURL = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}${genreParam}`;

    const url = search
      ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
      : genreURL;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setSearchRes(data.results);
        setSearch("");
        setGenre("");
      });
  }

  return (
    <div className="search">
      <TextField
        onChange={handleInput}
        value={search}
        id="outlined-basic"
        label="Search Movies..."
        variant="outlined"
      />
      <section className="separator">or</section>
      <Select
        label="Genre"
        value={genre}
        onChange={handleGenreSelect}
        style={{ minWidth: "120px" }}
      >
        <MenuItem value="">All Genres</MenuItem>
        <MenuItem value="28">Action</MenuItem>
        <MenuItem value="12">Adventure</MenuItem>
        <MenuItem value="16">Animation</MenuItem>
        <MenuItem value="35">Comedy</MenuItem>
        <MenuItem value="80">Crime</MenuItem>
        <MenuItem value="99">Documentary</MenuItem>
        <MenuItem value="18">Drama</MenuItem>
        <MenuItem value="10751">Family</MenuItem>
        <MenuItem value="14">Fantasy</MenuItem>
        <MenuItem value="36">History</MenuItem>
        <MenuItem value="27">Horror</MenuItem>
        <MenuItem value="10402">Music</MenuItem>
        <MenuItem value="9648">Mystery</MenuItem>
        <MenuItem value="10749">Romance</MenuItem>
        <MenuItem value="878">Science Fiction</MenuItem>
        <MenuItem value="10770">TV Movie</MenuItem>
        <MenuItem value="53">Thriller</MenuItem>
        <MenuItem value="10752">War</MenuItem>
        <MenuItem value="37">Western</MenuItem>
      </Select>

      <Button
        size="large"
        variant="contained"
        onClick={handleSearch}
        style={{ marginLeft: "8px", marginTop: "0px" }}
      >
        Go!
      </Button>
    </div>
  );
}
