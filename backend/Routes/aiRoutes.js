import express from "express";
const router = express.Router();

// Mock AI responses for demo
router.post("/", (req, res) => {
  const { mode, message } = req.body;

  if (mode === "ask") {
    return res.json({
      response: `🦉 QU InfoBot: The dining hall is open from 7 AM to 9 PM today.`,
    });
  }

  if (mode === "teach") {
    return res.json({
      response: `🎓 TeachQU: Interesting! Can you give an example where that concept might fail?`,
    });
  }

  res.json({ response: "Please select a mode first." });
});

export default router;
