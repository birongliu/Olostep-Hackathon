const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require("cors");
const authMiddleware = require('./middleware/authMiddleware');

dotenv.config();

const app = express();

connectDB();

app.use(express.json({ extended: false }));
app.use(cors({ origin: process.env.FRONTEND }))
app.use("/api/health", (req, res) => res.status(200).json({ data: "ok", status: 200 }))
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/scraper', /*authMiddleware,*/ require('./routes/scrapRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Your app is running at http://127.0.0.1:${PORT}`)
);

app.get('/', (req, res) => {
  res.send('Your app is running successfully!');
});

app.use((req, res) => {
  res.status(404).json({ status: 404, data: 'No resource found' });
});
