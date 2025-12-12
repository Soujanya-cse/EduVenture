import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // ✅ added useNavigate

const FlashcardPage = () => {
  const { topicKey } = useParams();
  const navigate = useNavigate(); // ✅ navigation hook
  const [flashcards, setFlashcards] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch(`/json/${topicKey}.json`)
      .then((res) => res.json())
      .then((data) => setFlashcards(data))
      .catch((err) => {
        console.error("Error loading JSON:", err);
        setFlashcards([]);
      });
  }, [topicKey]);

  if (flashcards.length === 0)
    return <div style={{ textAlign: "center", padding: "50px" }}>Loading flashcards...</div>;

  const currentTopic = flashcards[index];

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `/pdfs/${topicKey}.pdf`;
    link.download = `${topicKey}.pdf`;
    link.click();
  };

  const handleNext = () => index < flashcards.length - 1 && setIndex(index + 1);
  const handlePrev = () => index > 0 && setIndex(index - 1);
  const handleBack = () => navigate("/aptitude"); // ✅ route back to TopicSelectionPage

  const styles = {
    page: {
      width: "100%",
      minHeight: "100vh",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      backgroundImage: "url('/flash5.jpg')",
      backgroundSize: "100% auto",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center top",
      padding: "40px",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      zIndex: 0,
    },
    container: {
      width: "90%",
      maxWidth: "1100px",
      margin: "0 auto",
      background: "rgba(255, 255, 255, 0.95)",
      padding: "50px",
      borderRadius: "20px",
      textAlign: "left",
      boxShadow: "0 12px 35px rgba(0, 0, 0, 0.5)",
      overflowY: "auto",
      maxHeight: "90vh",
      position: "relative",
      zIndex: 1,
      transition: "all 0.3s ease",
    },
    backButton: {
      position: "absolute",
      top: "20px",
      left: "20px",
      background: "#1e3a8a",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      padding: "10px 18px",
      fontSize: "16px",
      fontWeight: 600,
      cursor: "pointer",
      zIndex: 2,
      transition: "0.3s",
    },
    topicHeading: {
      textTransform: "capitalize",
      marginBottom: "30px",
      fontWeight: 900,
      fontSize: "34px",
      color: "#1e3a8a",
      textAlign: "center",
      borderBottom: "2px solid #1e3a8a",
      paddingBottom: "10px",
    },
    flashcardContent: {
      lineHeight: "1.8",
      fontSize: "18px",
    },
    heading: {
      fontWeight: 800,
      fontSize: "24px",
      color: "#1e40af",
      marginTop: "20px",
      marginBottom: "10px",
    },
    formulaBox: {
      borderLeft: "4px solid #2563eb",
      background: "#e0f2fe",
      padding: "12px 15px",
      margin: "12px 0",
      borderRadius: "8px",
      fontWeight: 600,
      fontSize: "18px",
      color: "#000",
    },
    tipText: {
      background: "#f0f9eb",
      borderLeft: "4px solid #10b981",
      padding: "10px 15px",
      borderRadius: "6px",
      fontStyle: "italic",
      color: "#065f46",
      margin: "10px 0",
    },
    text: {
      margin: "8px 0",
      fontSize: "18px",
      color: "#171f29ff",
    },
    navButtons: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "30px",
    },
    navBtn: {
      background: "#3b82f6",
      color: "#fff",
      border: "none",
      padding: "12px 24px",
      borderRadius: "10px",
      fontSize: "16px",
      fontWeight: 600,
      cursor: "pointer",
      transition: "0.3s",
    },
    disabledBtn: {
      background: "#9ca3af",
      cursor: "not-allowed",
    },
    downloadBtn: {
      background: "#10b981",
      color: "#fff",
      border: "none",
      padding: "14px 28px",
      borderRadius: "12px",
      fontSize: "17px",
      cursor: "pointer",
      marginTop: "25px",
      fontWeight: 600,
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      transition: "0.3s",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay} />
      <div style={styles.container}>
        {/* ✅ Back Button */}
        <button
          style={styles.backButton}
          onClick={handleBack}
          onMouseOver={(e) => (e.target.style.background = "#0f172a")}
          onMouseOut={(e) => (e.target.style.background = "#1e3a8a")}
        >
          ⬅
        </button>

        <h1 style={styles.topicHeading}>{currentTopic.heading}</h1>

        <div style={styles.flashcardContent}>
          {currentTopic.content.map((card, idx) => {
            switch (card.type) {
              case "bold":
                return (
                  <h2 key={idx} style={styles.heading}>
                    {card.text}
                  </h2>
                );
              case "formula":
                return (
                  <div key={idx} style={styles.formulaBox}>
                    {card.text}
                  </div>
                );
              case "tip":
                return (
                  <p key={idx} style={styles.tipText}>
                    💡 {card.text}
                  </p>
                );
              case "text":
                return (
                  <p key={idx} style={styles.text}>
                    {card.text}
                  </p>
                );
              default:
                return null;
            }
          })}
        </div>

        {/* Navigation Buttons */}
        <div style={styles.navButtons}>
          <button
            style={{
              ...styles.navBtn,
              ...(index === 0 ? styles.disabledBtn : {}),
            }}
            onClick={handlePrev}
            disabled={index === 0}
          >
            ⬅ Prev
          </button>

          <button
            style={{
              ...styles.navBtn,
              ...(index === flashcards.length - 1 ? styles.disabledBtn : {}),
            }}
            onClick={handleNext}
            disabled={index === flashcards.length - 1}
          >
            Next ➡
          </button>
        </div>

        {/* Download Button */}
        <button
          style={styles.downloadBtn}
          onClick={handleDownload}
          onMouseOver={(e) => (e.target.style.background = "#059669")}
          onMouseOut={(e) => (e.target.style.background = "#10b981")}
        >
          ⬇ Download PDF
        </button>
      </div>
    </div>
  );
};

export default FlashcardPage;