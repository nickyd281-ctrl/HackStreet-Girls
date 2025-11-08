import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const client = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Model: Gemini 1.5 or latest
const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });

// 🎓 Prompt wrapper for Quinnipiac context
const basePrompt = `
You are "BoomerBot" — a helpful chatbot designed for students at Quinnipiac University.
Answer questions about Quinnipiac's academics, housing, dining, campus life, and student resources.
If you don’t know the answer or it’s outside Quinnipiac’s scope, politely say so.
Be concise, accurate, and friendly.
`;

app.post("/ask", async (req, res) => {
  try {
    const userQuestion = req.body.question;

    if (!userQuestion) {
      return res.status(400).json({ error: "Missing 'question' in request body." });
    }

    const result = await model.generateContent(`${basePrompt}\nStudent: ${userQuestion}`);
    const answer = result.response.text();

    res.json({ answer });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to generate response." });
  }
});

app.get("/", (req, res) => {
  res.send("🎓 Quinnipiac Chatbot API is running!");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});