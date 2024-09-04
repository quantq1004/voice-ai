const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const voiceController = require('../controllers/voice');
const { auth, hasRole } = require('../middlewares/auth');
const {
  createVoiceValidate,
  updateVoiceValidate,
} = require('../validations/voice');

/* eslint-disable prettier/prettier */
router.post('/voices', auth, createVoiceValidate, asyncMiddleware(voiceController.createVoice));
router.put('/voices/:id', auth, updateVoiceValidate, asyncMiddleware(voiceController.updateVoice));
router.get('/voices', auth, asyncMiddleware(voiceController.getVoices));
router.delete('/voices/:id', auth, asyncMiddleware(voiceController.deleteVoice));
router.get('/voices/:id/audios', auth, asyncMiddleware(voiceController.getAudios));
router.get('/voices/:id', auth, asyncMiddleware(voiceController.getVoiceById));
router.get('/voices/:id/voices-download', auth, asyncMiddleware(voiceController.getAudiosDownloadUrl));
router.get('/admin/voices', auth, hasRole('manage-voices-cloning'), asyncMiddleware(voiceController.getVoicesForAdmin));
router.get('/admin/voices/:id', auth, hasRole('manage-voices-cloning'), asyncMiddleware(voiceController.getVoiceByIdForAdmin));
router.get('/voices/:id/submit-check', auth, asyncMiddleware(voiceController.checkConditionSubmitVoice));
router.put('/admin/voices/:id', updateVoiceValidate, auth, hasRole('manage-voices-cloning'), asyncMiddleware(voiceController.updateVoiceForAdmin));
/* eslint-enable prettier/prettier */

module.exports = router;
