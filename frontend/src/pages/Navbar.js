import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
const profileImageUrl = user?.profileImage || "/profile.jpeg";
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = (e) => {
    // Prevent triggering parent or navigation
    e.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
  // Clear all auth-related data from localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("isLoggedIn");

  // Close dropdown
  setDropdownOpen(false);

  // Show success message (optional)
  alert("Logged out successfully!");

  // Redirect to the initial landing page (HomePage at "/")
  navigate("/");
};

  const handleProfileClick = () => {
    // Close dropdown if open, then navigate
    if (dropdownOpen) setDropdownOpen(false);
    navigate("/dashboard");
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div className="logo">
        <button className="logo-button" aria-label="logo">▶</button>
        EduVenture
      </div>

      {/* Right: Nav links + Learn AI + Profile */}
      <div className="nav-right">
        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
          <NavLink to="/category" className={({ isActive }) => (isActive ? "active" : "")}>
            Concepts
          </NavLink>
        </div>

        <button className="learn-ai-button" onClick={() => navigate("/quiz")}>
          Learn with AI
        </button>

        <div className="profile-dropdown" ref={dropdownRef}>
          <div className="profile-trigger">
            {/* Profile image: navigate to dashboard */}
            <img
  src={profileImageUrl}
  alt="Profile"
  onClick={handleProfileClick}
  style={{ cursor: 'pointer', width: '32px', height: '32px', borderRadius: '50%' }}
/>
            {/* Down arrow: toggle dropdown only */}
            <span
              className={`down-arrow ${dropdownOpen ? "open" : ""}`}
              onClick={toggleDropdown}
              style={{ cursor: 'pointer' }}
            >
              ▼
            </span>
          </div>

          {dropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}