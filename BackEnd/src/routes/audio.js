const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const audioController = require('../controllers/audio');
const { auth, hasRole } = require('../middlewares/auth');
const {
  createAudioValidate,
  updateAudioValidate,
} = require('../validations/audio');

/* eslint-disable prettier/prettier */
router.post('/audios', auth, createAudioValidate, asyncMiddleware(audioController.createAudio));
router.put('/audios/:id', auth, updateAudioValidate, asyncMiddleware(audioController.updateAudio));
router.put('/admin/audios/:id', auth, hasRole('manage-voices-cloning'), updateAudioValidate, asyncMiddleware(audioController.updateAudioForAdmin));
/* eslint-enable prettier/prettier */

module.exports = router;
