import express from "express";
import cors from "cors";
import aiRoutes from "./Routes/aiRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// AI routes
app.use("/api/ai", aiRoutes);

// Test endpoint
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
