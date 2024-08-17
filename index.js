const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/scraper', require('./routes/scrapRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Your app is running at http://127.0.0.1:${PORT}`)
);

app.get('/', (req, res) => {
  res.send('Your app is running successfully!');
});

app.use((req, res) => {
  res.status(404).json({ status: 404, message: 'No resource found' });
});
