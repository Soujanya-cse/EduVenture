import React from "react";
import { useNavigate} from "react-router-dom";
import "../styles/ModeSelection.css";
import Navbar from "./Navbar";

const ModeSelection = () => {
  const navigate = useNavigate();

  const handleEasyModeClick = () => {
    navigate("/gameselection"); // route to GameSelection page
  };

  // Background image style for blur effect
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
    zIndex: -1,
  };

  return (
    <div className="mode-selection-container" style={{ position: "relative", minHeight: "100vh" }}>
      {/* Background image */}
      <div style={backgroundStyle} />

      {/* Navbar */}
      <Navbar/>
      {/* Back Button and Heading */}
      <div className="header-row">
  <button
    className="back-button"
    aria-label="Back"
    onClick={() => navigate("/category")}
  >
    ←
  </button>
  <h2>Start Learning with EduVenture, Pick a Mode and Begin!</h2>
</div>

      {/* Mode selection cards */}
      <div className="mode-cards">
        <div className="mode-card easy-mode">
          <h3>Easy</h3>
          <p>
            Start with the basics! Learn simple concepts through fun quizzes,
            flashcards, and drag-and-drop games designed for beginners
          </p>
          <p className="mode-status">
            <span role="img" aria-label="unlocked">🔓</span> Unlocked
          </p>
          <button className="start-button easy-button" onClick={handleEasyModeClick}>Start Now</button>
        </div>

        <div className="mode-card medium-mode">
          <h3>Medium</h3>
          <p>
            Challenge yourself with moderate-level activities that require logic,
            memory, and understanding of core topics
          </p>
          <p className="mode-status">
            <span role="img" aria-label="locked">🔒</span> Locked
          </p>
          <button className="start-button medium-button" disabled>Start Now</button>
        </div>

        <div className="mode-card hard-mode">
          <h3>Hard</h3>
          <p>
            Ready for a real test? These levels include advanced quizzes,
            scenario-based challenges, and problem-solving tasks
          </p>
          <p className="mode-status">
            <span role="img" aria-label="locked">🔒</span> Locked
          </p>
          <button className="start-button hard-button" disabled>Start Now</button>
        </div>
      </div>
    </div>
  );
};

export default ModeSelection;
