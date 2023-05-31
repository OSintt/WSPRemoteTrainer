import { Router } from 'express';
import { training, listen } from '../controllers/training';
import { checkKey } from '../middleware/checkReq';
const router = Router();
router.get('/', [checkKey], training);
router.get('/listen', [checkKey], listen);

module.exports = router;