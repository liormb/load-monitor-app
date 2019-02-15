import express from 'express';
import {
    getLoad,
    startMonitor,
    stopMonitor,
} from '../controllers/monitor';

const router = express.Router();

router.get('/load', getLoad);
router.post('/start', startMonitor);
router.post('/stop', stopMonitor);

export default router;
