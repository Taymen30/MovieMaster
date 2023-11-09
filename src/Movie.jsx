import { useEffect, useState } from "react";
import "./Movie.css";

import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import ImageList from "./ImageList";
import Trailer from "./Trailer";

const apiKey = process.env.REACT_APP_API_KEY;

export default function Movie({ movie, setBackground, setActorDetails }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cast, setCast] = useState([]);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    const backgroundImageStyle = {
      backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      width: "100%",
      height: "1500px",
      color: "white",
      textAlign: "center",
    };
    fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCast(data.cast);
        setBackground(backgroundImageStyle);
      })
      .catch((error) => console.error("Error fetching credits:", error));
  }, [movie.id, setBackground, movie.backdrop_path]);

  return (
    <div className="movie-wrapper" key={movie.id}>
      <h1 className="movie-title">{movie.title}</h1>
      <div className="content-container">
        <div className="trailer">
          <Trailer movieId={movie.id} />
        </div>
        <div className="overview-box">
          <h2>Overview</h2>
          <p className="movie-overview">{movie.overview}</p>
        </div>
      </div>
      <section className="cast">
        <Button variant="contained" onClick={handleDrawerOpen}>
          Cast
        </Button>
        <Drawer anchor="bottom" open={drawerOpen} onClose={handleDrawerClose}>
          <div style={{ width: "100%", textAlign: "center" }}>
            <ImageList setActorDetails={setActorDetails} arr={cast} />
          </div>
        </Drawer>
      </section>
    </div>
  );
}
