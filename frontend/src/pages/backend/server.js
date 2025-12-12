import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Note: No need for node-fetch if using native fetch (Node.js 18+)
// If you're on older Node, uncomment next line and install node-fetch@2
// import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

const PORT = process.env.PORT || 5000;

// ✅ Utility: Clean + format AI responses consistently
function formatAnswer(text) {
  if (!text) return "⚠ No reply";

  let formatted = text.trim();

  // Remove Markdown headers like ##, ### etc.
  formatted = formatted.replace(/^#+\s?/gm, "");

  // Remove bold: **text** or __text__ → text
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, "$1");
  formatted = formatted.replace(/__(.*?)__/g, "$1");

  // Remove italic: *text* or _text_ → text
  formatted = formatted.replace(/\*(.*?)\*/g, "$1");
  formatted = formatted.replace(/_(.*?)_/g, "$1");

  // Replace markdown list markers with bullets
  formatted = formatted.replace(/^\s*[-*+]\s+/gm, "• ");

  // Normalize multiple newlines
  formatted = formatted.replace(/\n{2,}/g, "<br><br>");
  formatted = formatted.replace(/\n/g, "<br>");

  return formatted.trim();
}

// Health check
app.get("/", (_req, res) => res.send("✅ Ollama proxy is running"));

// Chat endpoint — using Ollama (local LLM)
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "message is required" });
    }

    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.2:1b", // ✅ Use your installed model
        messages: [{ role: "user", content: message }],
        stream: false
      })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Ollama error:", data);
      return res.status(500).json({ error: "Ollama request failed" });
    }

    const rawReply = data?.message?.content ?? "⚠ No reply";
    const reply = formatAnswer(rawReply);
    return res.json({ reply });

  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Server error while fetching answer" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Ollama backend running at http://localhost:${PORT}`);
});