import React from "react";
import { useNavigate } from "react-router-dom";

const TopicSelectionPage = () => {
  const navigate = useNavigate();

  const topics = [
    { key: "speed_and_distance", name: "Speed & Distance" },
    { key: "profit_loss", name: "Profit & Loss" },
    { key: "ratio_proportion", name: "Ratio & Proportion" },
    { key: "time_work", name: "Time & Work" },
    { key: "simple_interest", name: "Simple Interest" },
    { key: "compound_interest", name: "Compound Interest" },
    { key: "percentage", name: "Percentage" },
    { key: "average", name: "Average" },
    { key: "number_system", name: "Number System" },
  ];

  const handleSelectTopic = (key) => {
    navigate(`/flashcards/${key}`);
  };

  const handleBack = () => {
    navigate("/"); // ✅ change this route to your desired previous page if needed
  };

  const styles = {
    page: {
      width: "100%",
      minHeight: "100vh",
      backgroundImage: "url('/flash6.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px",
      boxSizing: "border-box",
      position: "relative", // ✅ for back button positioning
    },

    backButton: {
      position: "absolute",
      top: "20px",
      left: "20px",
      background: "#2f121282",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      padding: "10px 18px",
      fontSize: "20px",
      fontWeight: 700,
      cursor: "pointer",
      zIndex: 10,
      transition: "0.3s",
    },

    contentWrapper: {
      display: "flex",
      width: "90%",
      justifyContent: "space-between",
      alignItems: "center",
    },

    topicsGridWrapper: {
      width: "75%",
      display: "flex",
      justifyContent: "center",
      height: "100vh",
      alignItems: "center",
    },

    topicsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "25px",
      width: "100%",
    },

    topicBox: {
  backgroundImage: "url('/wood1.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: "16px",
  height: "160px",   // 🔹 reduced from 200px → 160px
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
  transition: "transform 0.3s ease",
},

innerBox: {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "12px",
  width: "85%",   // 🔹 reduced from 80%
  height: "75%",  // 🔹 reduced from 70%
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: "5px",
},


    topicTitle: {
      fontSize: "22px",
      fontWeight: 800,
      color: "#000000ff",
    },

    girlSection: {
      width: "20%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },

    girlImage: {
      width: "180%",
      height: "auto",
    },

    speechBubble: {
      background: "#fff",
      color: "#1e293b",
      fontSize: "24px",
      fontWeight: 800,
      borderRadius: "20px",
      padding: "20px 28px",
      marginTop: "-60px",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.25)",
      textAlign: "center",
      border: "2px solid #1e3a8a",
      animation: "pop 1.8s ease-in-out infinite",
      zIndex: 2,
    },
  };

  // ✅ Define keyframes for pop animation once safely
  React.useEffect(() => {
    const styleSheet = document.styleSheets[0];
    const keyframes = `
      @keyframes pop {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }
    `;
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
  }, []);

  return (
    <div style={styles.page}>
      {/* ✅ Back Button */}
      <button
        style={styles.backButton}
        onClick={handleBack}
        onMouseOver={(e) => (e.target.style.background = "#17723aff")}
        onMouseOut={(e) => (e.target.style.background = "#421919ff")}
      >
        ⬅ Back
      </button>

      <div style={styles.contentWrapper}>
        {/* Topics Grid Wrapper */}
        <div style={styles.topicsGridWrapper}>
          <div style={styles.topicsGrid}>
            {topics.map((topic) => (
              <div
                key={topic.key}
                style={styles.topicBox}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                onClick={() => handleSelectTopic(topic.key)}
              >
                <div style={styles.innerBox}>
                  <span style={styles.topicTitle}>{topic.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Girl Section */}
        <div style={styles.girlSection}>
          <img src="/girl.png" alt="Girl pointing" style={styles.girlImage} />
          <div style={styles.speechBubble}>
            💭 "Select an aptitude topic and glance quickly!"
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicSelectionPage;