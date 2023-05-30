"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _express = require("express");
const router = (0, _express.Router)();
router.use('/train', require('./training.routes'));
module.exports = router;
