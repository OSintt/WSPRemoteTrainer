"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _express = require("express");
const _training = require("../controllers/training");
const router = (0, _express.Router)();
router.get('/', _training.training);
module.exports = router;
