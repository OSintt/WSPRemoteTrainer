import { Router } from 'express';
import { training } from '../controllers/training';

const router = Router();
router.get('/train', training);

module.exports = router;