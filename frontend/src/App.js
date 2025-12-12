import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CategoryPage from "./pages/CategoryPage";
import ModeSelection from "./pages/ModeSelection";
import GameSelection from "./pages/GameSelection";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
// import LevelPage from "./pages/LevelPage";
import Chatbot from "./pages/Chatbot";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import QuizPage from "./pages/QuizPage";
import FlashcardPage from "./pages/FlashcardPage";
import TopicSelectionPage from "./pages/TopicSelectionPage";
import CompanyPage from "./pages/CompanyPage";

function App() {
  return (
	<div> 
		<Chatbot/>
	
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ca" element={<Navigate to="/category" replace />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/mode" element={<ModeSelection />} />
        <Route path="/gameselection" element={<GameSelection />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/level/:gameId" element={<LevelPage />} /> */}
        {/* <Route path="/home" element={<HomePage />} />  */}
        <Route path="/quiz" element={<QuizPage />} /> 
        <Route path="/aptitude" element={<TopicSelectionPage />} />
        <Route path="/flashcards/:topicKey" element={<FlashcardPage />} />
        <Route path="/company" element={<CompanyPage />} />
<Route
  path="/family-mansion"
  element={
    <iframe
      src={`${process.env.PUBLIC_URL}/family-mansion.html`}
      title="Family Mansion Game"
      style={{ width: "100%", height: "100vh", border: "none" }}
    />
  }
/>

      </Routes>
    </Router>
	</div>
  );
}

export default App;
