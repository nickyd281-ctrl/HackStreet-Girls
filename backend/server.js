import express from "express";

const app = express();

// Test endpoint
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
