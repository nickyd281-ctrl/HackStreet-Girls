import express from "express";
const router = express.Router();

// Example mock database for campus info
const campusInfo = {
  dining: "The dining hall is open from 7 AM to 9 PM today.",
  shuttle: "The shuttle runs every 15 minutes from 7 AM to 11 PM.",
  library: "The library is open 24/7 for students during finals week.",
};

// Simple quiz questions for TeachQU mode
const teachQUQuestions = [
  "Explain the difference between a list and a tuple in Python.",
  "What is polymorphism in object-oriented programming?",
  "Describe the difference between HTTP and HTTPS."
];

// AI route
router.post("/", (req, res) => {
  const { mode, message } = req.body;

  if (!mode || !message) {
    return res.status(400).json({ response: "Mode and message are required." });
  }

  if (mode === "ask") {
    // Return a campus info answer based on keywords
    const keyword = message.toLowerCase();
    let response = "Sorry, I don't have information about that.";

    if (keyword.includes("dining")) response = campusInfo.dining;
    else if (keyword.includes("shuttle")) response = campusInfo.shuttle;
    else if (keyword.includes("library")) response = campusInfo.library;

    return res.json({ response: `🦉 QU InfoBot: ${response}` });
  }

  if (mode === "teach") {
    // Pick a random quiz question for TeachQU
    const randomQuestion =
      teachQUQuestions[Math.floor(Math.random() * teachQUQuestions.length)];
    return res.json({
      response: `🎓 TeachQU: ${randomQuestion}`,
    });
  }

  res.json({ response: "Please select a valid mode (ask or teach)." });
});

export default router;
