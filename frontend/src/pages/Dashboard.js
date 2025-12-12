import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [profileImage, setProfileImage] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const [college, setCollege] = useState("");
  const [about, setAbout] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  

  const [score, setScore] = useState(0);
const [badges, setBadges] = useState([]);
const [completedGames, setCompletedGames] = useState([]);

// Update the useEffect hook to get score and badges
useEffect(() => {
  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/profile/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        const user = data.user;
        setProfile(user);
        setMobile(user.mobile || "");
        setGender(user.gender || "");
        setCollege(user.college || "");
        setAbout(user.about || "");
        setProfileImage(user.profileImage || "");
        setScore(user.score || 0); // Set the score
        setBadges(user.badges || []); // Set badges
        setCompletedGames(user.completedGames || []); // Set completed games
        // ✅ Update localStorage so Navbar can access it
        localStorage.setItem("user", JSON.stringify(user));
      }
    } catch (err) {
      console.error("Profile fetch failed");
      navigate("/login");
    }
  };

  fetchProfile();
}, [navigate]);

  const learnedConcepts = [
    "Ratios and Percentage",
    "Distance and Velocity",
    "Time and Speed",
    "Profit and Loss",
  ];

  // Fetch user profile on mount
 useEffect(() => {
  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/profile/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        const user = data.user;
        setProfile(user);
        setMobile(user.mobile || "");
        setGender(user.gender || "");
        setCollege(user.college || "");
        setAbout(user.about || "");
        setProfileImage(user.profileImage || "");
        // ✅ Update localStorage so Navbar can access it
        localStorage.setItem("user", JSON.stringify(user));
      }
    } catch (err) {
      console.error("Profile fetch failed");
      navigate("/login");
    }
  };

  fetchProfile();
}, [navigate]);

  // Handle image upload (convert to base64)
  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setProfileImage(reader.result); // base64 string
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      // Create canvas to resize
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Max dimension
      const maxSize = 300;
      let { width, height } = img;
      if (width > height) {
        if (width > maxSize) {
          height *= maxSize / width;
          width = maxSize;
        }
      } else {
        if (height > maxSize) {
          width *= maxSize / height;
          height = maxSize;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      // Compress to JPEG (70% quality)
      const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
      setProfileImage(compressedBase64);
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
};

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  // Save profile changes to backend
  const handleSave = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:8080/profile/me", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      mobile,
      gender,
      college,
      about,
      profileImage,
    }),
  });
  const data = await res.json();
  if (data.success) {
    // ✅ Update state with saved data
    const user = data.user;
    setProfile(user);
    setMobile(user.mobile || "");
    setGender(user.gender || "");
    setCollege(user.college || "");
    setAbout(user.about || "");
    setProfileImage(user.profileImage || "");
    
    // ✅ Update localStorage for Navbar
    localStorage.setItem("user", JSON.stringify(user));
    
    setIsEditing(false); // Switch to static view
  }
};

  return (
    <div
      className="mode-selection-container"
      style={{ position: "relative", minHeight: "100vh" }}
    >
      {/* Background image */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage: `url(${process.env.PUBLIC_URL + "/back3.jpeg"})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          filter: "blur(2px)",
          opacity: 0.5,
          zIndex: -1,
        }}
      />

      {/* Navbar */}
      <Navbar />
      <div className="header-row">
        <button
          className="back-button"
          onClick={() => navigate("/")}
        >
          ←
        </button>
      </div>

      {/* Profile Section */}
      <div className="profile-section">
        <div className="profile-image-upload">
          <img
            src={
              profileImage ||
              process.env.PUBLIC_URL + "/profile.jpeg"
            }
            alt="User"
            className="extra-large-profile-img"
          />
          {isEditing && (
            <div className="image-buttons">
              <input
                type="file"
                id="upload"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              <label htmlFor="upload" className="upload-btn">
                Upload
              </label>
              <button
                className="remove-btn"
                onClick={() => setProfileImage("")}
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {/* Profile Details */}
        <div className="profile-details">
          <h2>Profile</h2>
          <p>
            <strong>Name:</strong> {profile.name || "Your Name"}
          </p>
          <p>
            <strong>Email:</strong> {profile.email || "you@example.com"}
          </p>

          {isEditing ? (
            <>
              <label className="form-label">Mobile Number</label>
              <input
                type="text"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />

              {/* Gender */}
              <div className="form-group">
                <label className="form-label">Gender</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={gender === "Male"}
                      onChange={handleGenderChange}
                    />{" "}
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={gender === "Female"}
                      onChange={handleGenderChange}
                    />{" "}
                    Female
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Other"
                      checked={gender === "Other"}
                      onChange={handleGenderChange}
                    />{" "}
                    Other
                  </label>
                </div>
              </div>

              <label className="form-label">College</label>
              <input
                type="text"
                placeholder="College"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
              />
              <label className="form-label">About</label>
              <textarea
                placeholder="Write about yourself..."
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>

              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
            </>
          ) : (
            <>
              <p>
                <strong>Mobile:</strong> {profile.mobile || mobile}
              </p>
              <p>
                <strong>Gender:</strong> {profile.gender || gender}
              </p>
              <p>
                <strong>College:</strong> {profile.college || college}
              </p>
              <p>
                <strong>About Me:</strong> {profile.about || about}
              </p>
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                Edit
              </button>
            </>
          )}
        </div>

        {/* Extra Image Inside Profile */}
        <div className="extra-image-inside">
          <img
            src={process.env.PUBLIC_URL + "/medal.png"}
            alt="Decorative"
          />
        </div>
      </div>

     {/* Stats + Concepts Section */}
<div className="stats-concepts">
  {/* Left Column */}
  <div className="left-column">
    <div className="stat-card">
      <h3>Score</h3>
      <p>{score}</p>
    </div>
    <div className="stat-card">
      <h3>Badges Earned</h3>
      <p>{badges.length}</p>
    </div>
    <div className="stat-card">
      <h3>Games Completed</h3>
      <p>{completedGames.length}</p>
    </div>
  </div>

  {/* Right Column */}
  <div className="concepts-card">
    <h3>🏆 Badges Earned</h3>
    <ul>
      {badges.length > 0 ? (
        badges.map((badge, index) => (
          <li key={index}>{badge}</li>
        ))
      ) : (
        <li>No badges yet. Play games to earn badges!</li>
      )}
    </ul>
  </div>
</div>
    </div>
  );
};

export default Dashboard;
