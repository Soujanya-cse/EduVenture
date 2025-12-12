import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";
import Navbar from "./Navbar";

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login state when component loads
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleButtonClick = () => {
    if (isLoggedIn) {
      navigate("/category"); // Go to category page after login
    } else {
      navigate("/login"); // Go to login page if not logged in
    }
  };

  // 🔹 Handle click for the "Quick glance feature card
  const handleFeatureClick = (feature) => {
    if (feature === "personalized") {
      navigate("/aptitude"); // Route to topic selection page
    }
  };

  // 🔹 Handle click for the "Company Prep" feature card
  const handleFeatClick = (feat) => {
    if (feat === "prep") {
      navigate("/company"); // Route to topic selection page
    }
  };

  // 🔹 Handle click for the "Company Prep" feature card
  const handleAiClick = (featu) => {
    if (featu === "rein") {
      navigate("/quiz"); // Route to topic selection page
    }
  };

  return (
    <div className="page-container">
      {/* Navbar */}
      <Navbar />

      {/* Background wrapper */}
      <div
        className="background-wrapper"
        style={{
          backgroundImage: "url('/home5.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          color: "white",
          width: "100%",
        }}
      >
        {/* Hero Section */}
        <section
          className="banner"
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "70px",
            textAlign: "center",
            position: "relative",
          }}
        >
          <div className="banner-content" style={{ maxWidth: "60%" }}>
            <h1>Welcome to EduVenture!</h1>
            <p>Empowering learning through gamification.</p>
            <p>
              Explore fun activities, solve puzzles, and improve skills through interactive games.
            </p>
            <button className="start-btn" onClick={handleButtonClick}>
              {isLoggedIn ? "▶ Play" : "▶ Get Started"}
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <h2>Why to Choose EduVenture?</h2>
          <div className="features-container">
            <div className="feature-card">
              <img src="/icon.jpeg" alt="Interactive Games" />
              <h3>Interactive Games</h3>
              <p>Learn concepts while playing.</p>
            </div>
            
            {/* 🔹 Make "Personalized Learning" clickable */}
            <div
              className="feature-card"
              onClick={() => handleFeatureClick("personalized")}
              style={{ cursor: "pointer" }}
            >
              <img src="/person.png" alt="Personalized Learning" />
              <h3>Quick Glance</h3>
              <p>formulas at fingertips.</p>
            </div>

            <div
              className="feature-card"
              onClick={() => handleFeatClick("prep")}
              style={{ cursor: "pointer" }}
            >
              <img src="/company.jpg" alt="Progress Tracking" />
              <h3>Company Prep</h3>
              <p>Company wise Aptitude question Bank.</p>
            </div>

            <div
              className="feature-card"
              onClick={() => handleAiClick("rein")}
              style={{ cursor: "pointer" }}
            >
              <img src="/ai.jpg" alt="Progress Tracking" />
              <h3>Learn with AI</h3>
              <p>Quick revise using AI Partner</p>
            </div>

          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <p>&copy; 2025 EduVenture. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
