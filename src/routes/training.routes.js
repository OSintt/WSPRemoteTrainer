import { Router } from 'express';
import { training, listen, campaign } from '../controllers/training';
import { checkKey } from '../middleware/checkReq';
const router = Router();
router.get('/', [checkKey],  training);
router.get('/listen', [checkKey], listen);
router.get('/campaign', [checkKey], campaign);

module.exports = router;