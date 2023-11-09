import React, { useRef } from "react";
import "./ImageList.css";

export default function ImageList({ arr, setActorDetails }) {
  const containerRef = useRef(null);

  function scrollLeft() {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 200;
    }
  }

  function scrollRight() {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 200;
    }
  }
  function handleActor(actorId) {
    const apiKey = "41bd7e5ac0565f89061afe73f89c4cc5";
    const url = `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => setActorDetails(data))
      .catch((error) => console.error("Error fetching actor details:", error));
  }

  return (
    <div className="image-list-container">
      <button className="scroll-button" onClick={scrollLeft}>
        &lt;
      </button>
      <div className="image-list" ref={containerRef}>
        {arr.map((person) => {
          return (
            <div
              key={person.id}
              data-id={person.id}
              onClick={() => handleActor(person.id)}
              className="image-item"
            >
              <div className="image-wrapper">
                {person.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/original${person.profile_path}?w=248&fit=crop&auto=format&dpr=2`}
                    loading="lazy"
                  />
                ) : (
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Nophoto.jpg"
                    alt="No Photo Available"
                    loading="lazy"
                  />
                )}
                <div className="image-caption">
                  <p className="cast-member">{`${person.name}`}</p>
                  <p className="character">{person.character}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button className="scroll-button" onClick={scrollRight}>
        &gt;
      </button>
    </div>
  );
}
