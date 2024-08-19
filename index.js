import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import auth from "./routes/authRoutes.js";
import scraper from "./routes/scrapRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json({ extended: false }));
app.use(cors({ origin: process.env.FRONTEND }));
app.use("/api/health", (req, res) =>
  res.status(200).json({ data: "ok", status: 200 })
);
app.use("/api/auth", auth);
app.use("/api/scraper", scraper);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
  console.log(`Your app is running at http://127.0.0.1:${PORT}`)
);

app.get("/", (req, res) => {
  res.send("Your app is running successfully!");
});

app.use((req, res) => {
  res.status(404).json({ status: 404, data: "No resource found" });
});
