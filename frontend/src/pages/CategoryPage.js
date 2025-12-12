import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Category.css";
import Navbar from "./Navbar";

export default function CategoryPage() {
  const initialConcepts = [
    "Ratios and Percentage",
    "Distance and Velocity",
    "Time and Speed",
    "Profit and Loss",
    "Geometry",
    "Statistics"
  ];

  const extraConcepts = [
    "Physics",
    "General Knowledge",
    "Geography",
    "Chemistry",
    "Computer Science"
  ];

  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="category-page">
      {/* Navbar */}
      <Navbar/>

      {/* Content Section */}
      <div className="content">
        <div className="left-image">
          <img src="/boy2.png" alt="Learning" />
        </div>

        <div className="right-list">
          <h2>Available Concepts</h2>
          <ul>
            {initialConcepts.map((concept, index) => (
              <li
                key={index}
                className="concept-item"
                onClick={() => navigate("/mode", { state: { concept } })}
              >
                {concept}
              </li>
            ))}

            {showMore &&
              extraConcepts.map((concept, index) => (
                <li
                  key={index}
                  className="concept-item extra"
                  onClick={() => navigate("/mode", { state: { concept } })}
                >
                  {concept}
                </li>
              ))}
          </ul>

          <button className="more-btn" onClick={() => setShowMore(!showMore)}>
            {showMore ? "Show Less" : "More"}
          </button>
        </div>
      </div>
    </div>
  );
}
