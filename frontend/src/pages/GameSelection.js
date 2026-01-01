import React, { useEffect, useState } from "react";
import "../styles/GameSelection.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const GameSelection = () => {
  const navigate = useNavigate();
  const [userProgress, setUserProgress] = useState({
    startedGames: [],
    completedGames: []
  });

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        // Redirect to login if no token
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:8080/profile/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (data.success && data.user) {
          setUserProgress({
            startedGames: data.user.startedGames || [],
            completedGames: data.user.completedGames || []
          });
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  // Define games with consistent gameName (must match what you send to backend)
  const games = [
    {
      title: "Family Tree",
      description: "Sharpen your logic and master the art of quick decisions.",
      image: process.env.PUBLIC_URL + "/familytree.jpeg",
      gameName: "Family Mansion Mystery", // ⚠️ Must match what you send in saveScore()
      path: "/family-mansion",
    },
    {
      title: "Sequence Maze",
      description: "Solve puzzles to unlock the correct path through the maze.",
      image: process.env.PUBLIC_URL + "/maze.jpeg",
      gameName: "Sequence Maze",
      path: "/maze",
    },
    
    {  
    title: "Speed Race",
    description: "Test your reflexes and race against time!",
    image: process.env.PUBLIC_URL + "/race.jpg", // make sure this image exists in public/
    gameName: "Speed Race", // ⚠️ This name must match what your backend expects
    path: "/race", // unused, but included for structure
  
    }
  ];

  // Determine status for each game
  const getGameStatus = (gameName) => {
    if (userProgress.completedGames.includes(gameName)) {
      return { text: "Level Completed", class: "completed" };
    }
    if (userProgress.startedGames.includes(gameName)) {
      return { text: "Continue Learning", class: "in-progress" };
    }
    return { text: "Start Learning", class: "not-started" };
  };

const handleGameClick = async (gameName, event) => {
  event.preventDefault();
  const token = localStorage.getItem("token");
  if (!token) return navigate("/login");

  const game = games.find(g => g.gameName === gameName);
  if (!game) return;

  // Special handling for static HTML games
  if (gameName === "Sequence Maze" || gameName === "Speed Race") {
    try {
      await fetch("http://localhost:8080/profile/markGameStarted", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ gameName })
      });
    } catch (err) {
      console.error("Failed to mark game as started", err);
    }

    // Redirect to static HTML file
    if (gameName === "Sequence Maze") {
      window.location.href = "/maze.html";
    } else if (gameName === "Speed Race") {
      window.location.href = "/race.html";
    }
    return;
  }

  // For other games (React routes)
  try {
    await fetch("http://localhost:8080/profile/markGameStarted", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ gameName })
    });
    navigate(game.path);
  } catch (err) {
    console.error("Failed to mark game as started", err);
    navigate(game.path);
  }
};

  const backgroundStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundImage: `url(${process.env.PUBLIC_URL + '/game.jpeg'})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    filter: "blur(2px)",
    opacity: 0.4,
    zIndex: -1
  };

  return (
    <div className="mode-selection-container" style={{ position: "relative", minHeight: "100vh" }}>
      <div style={backgroundStyle} />

      <Navbar />

      <div className="header-row">
        <button
          className="back-button"
          onClick={() => window.history.length > 2 ? navigate('/mode') : navigate('/')}
        >
          ←
        </button>
        <div className="page-title">
          <h2>Hello! Welcome back</h2>
          <p>Build your foundation in logic and observation while enjoying games.</p>
        </div>
      </div>

      <div className="game-cards">
        {games.map((game, index) => {
          const status = getGameStatus(game.gameName);
          return (
            <div 
              key={index} 
              className="game-card-link"
              onClick={(e) => handleGameClick(game.gameName, e)}
              style={{ cursor: 'pointer' }}
            >
              <div className="game-card">
                <img src={game.image} alt={game.title} className="game-image" />
                <div className="game-info">
                  <h3>{game.title}</h3>
                  <p>{game.description}</p>
                  <span className={`status ${status.class}`}>{status.text}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameSelection;