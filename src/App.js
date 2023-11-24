import React, { useState } from "react";
import "./App.css";
import Discover from "./Discover";
import Search from "./Search";
import SearchResults from "./SearchResults";
import Button from "@mui/material/Button";
import Movie from "./Movie";
import ActorDetails from "./ActorDetails";

function App() {
  const [background, setBackground] = useState({});
  const [searchRes, setSearchRes] = useState([]);
  const [movieById, setMovieById] = useState({});
  const [actorDetails, setActorDetails] = useState({});

  return (
    <div className="App" style={background}>
      <header className="header">
        <nav>
          <Button
            variant="contained"
            onClick={() => {
              setMovieById({});
              setSearchRes([]);
              setBackground({});
              setActorDetails({});
            }}
            style={{
              position: "fixed",
              top: "20px",
              left: "20px",
              mixBlendMode: "difference",
            }}
          >
            Home
          </Button>
        </nav>
        <h1 className="logo">MovieMaster</h1>
        <Search setSearchRes={setSearchRes} />
      </header>

      {actorDetails.cast ? (
        <ActorDetails
          setMovieById={setMovieById}
          actorDetails={actorDetails}
          setActorDetails={setActorDetails}
        />
      ) : movieById.title ? (
        <Movie
          setActorDetails={setActorDetails}
          setBackground={setBackground}
          movie={movieById}
        />
      ) : (
        <>
          {searchRes.length > 0 ? (
            <SearchResults
              setActorDetails={setActorDetails}
              setMovieById={setMovieById}
              searchRes={searchRes}
            />
          ) : (
            <Discover
              setActorDetails={setActorDetails}
              setBackground={setBackground}
              setMovieById={setMovieById}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
