const express = require('express');
const router = express.Router();
const { scrap, deep_scrap } = require('../controllers/scrapController');

router.post('/scrap', scrap);
router.post('/deep_scrap', deep_scrap);

module.exports = router;
