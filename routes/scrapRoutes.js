import express from 'express';
const router = express.Router();
import { scrap, deep_scrap } from '../controllers/scrapController.js';

router.post('/scrap', scrap);
router.post('/deep_scrap', deep_scrap);

export default router;
