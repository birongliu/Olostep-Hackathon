require('dotenv').config();
import express from('express');
import router = express.Router();

router.get('/api', (req, res) => {
  res.json({ message: 'API endpoint' });
});

module.exports = router;
