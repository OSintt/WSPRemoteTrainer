import { Router } from 'express';

const router = Router();

router.use('/train', require('./training.routes'));

module.exports = router; 