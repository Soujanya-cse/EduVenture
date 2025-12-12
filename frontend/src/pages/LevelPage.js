// src/components/LevelPage.jsx
import React, { useState, useEffect } from "react";
import "../styles/LevelPage.css";
import Navbar from "./Navbar";

const levels = [
  { id: 9, x: 30, y: 92 },
  { id: 8, x: 55, y: 84 },
  { id: 7, x: 80, y: 70 },
  { id: 6, x: 72, y: 50 },
  { id: 5, x: 50, y: 55 },
  { id: 4, x: 22, y: 50 },
  { id: 3, x: 39, y: 35 },
  { id: 2, x: 64, y: 30 },
  { id: 1, x: 55, y: 14 },
];

function LevelPage() {
  const [completedLevels, setCompletedLevels] = useState([1]);
  const [levelStars] = useState(() => {
    let stars = {};
    levels.forEach((level) => {
      stars[level.id] = Math.floor(Math.random() * 3) + 1; // 1–3 stars
    });
    return stars;
  });

  // iframe control
  const [showGame, setShowGame] = useState(false);
  const [gameSrc, setGameSrc] = useState("");

  // close iframe on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setShowGame(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleLevelClick = (id) => {
    if (completedLevels.includes(id - 1) || id === 1) {
      if (!completedLevels.includes(id)) {
        setCompletedLevels([...completedLevels, id]);
      }
      // Open game HTML in iframe. The game will read "#level=X"
      setGameSrc(`/family-mansion.html#level=${id}`);
      setShowGame(true);
    } else {
      alert("Complete the previous level first!");
    }
  };

  return (
    <div
      className="level-page"
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: `url(${process.env.PUBLIC_URL + "/back3.jpeg"})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <Navbar />

      {showGame ? (
        <div className="iframe-wrap">
          <button
            className="iframe-back-btn"
            onClick={() => setShowGame(false)}
            title="Back to map (Esc)"
          >
            ← Back to Map
          </button>

          <iframe
            src={gameSrc || "/family-mansion.html#level=1"}
            title="Family Mansion Mystery"
            className="game-iframe"
            allowFullScreen
          />
        </div>
      ) : (
        <>
          {/* Map + Levels */}
          <div className="map-wrapper">
            <div style={{ position: "relative" }}>
              <img
                src={process.env.PUBLIC_URL + "/path2.jpeg"}
                alt="Level Map"
                style={{ display: "block", width: "100%", height: "auto" }}
              />

              {levels.map((level) => (
                <div
                  key={level.id}
                  className={`level ${
                    completedLevels.includes(level.id) ? "completed" : "locked"
                  }`}
                  style={{
                    position: "absolute",
                    left: `${level.x}%`,
                    top: `${level.y}%`,
                    transform: "translate(-50%, -50%)",
                    cursor: "pointer",
                  }}
                  onClick={() => handleLevelClick(level.id)}
                >
                  {completedLevels.includes(level.id) && (
                    <div className="stars">{"⭐".repeat(levelStars[level.id])}</div>
                  )}
                  <div className="level-number">{level.id}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default LevelPage;