const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const sentenceController = require('../controllers/sentence');
const { auth } = require('../middlewares/auth');
const { createSentenceValidate } = require('../validations/sentence');

/* eslint-disable prettier/prettier */
router.post('/sentences', auth, createSentenceValidate, asyncMiddleware(sentenceController.createSentence));
router.get('/sentences', auth, asyncMiddleware(sentenceController.getSentences));
/* eslint-enable prettier/prettier */

module.exports = router;
