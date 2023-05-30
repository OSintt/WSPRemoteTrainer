import { Router } from 'express';
import { training, listen } from '../controllers/training';

const router = Router();
router.get('/', training);
router.get('/listen', listen);

module.exports = router;