import { Router } from 'express';

const router = Router();

router.use('/t', require('./training.routes'));

module.exports = router; 