const audioDao = require('../daos/audio');
const audioService = require('../services/audio');

const createAudio = async (req, res) => {
  const { voiceId, categoryId, sentenceId, audioLink, quality } = req.body;
  const audio = await audioDao.createAudio({
    voiceId,
    categoryId,
    sentenceId,
    audioLink,
    quality,
  });
  return res.send({ audio });
};

const updateAudio = async (req, res) => {
  const { id } = req.params;
  const { audioLink } = req.body;
  const audio = await audioService.updateAudioById(id, { audioLink });
  return res.send({ audio });
};

const updateAudioForAdmin = async (req, res) => {
  const { id } = req.params;
  const { status, sentence } = req.body;
  const audio = await audioDao.updateAudioByIdForAdmin(id, {
    status,
    sentence,
  });
  return res.send({ audio });
};

module.exports = { createAudio, updateAudio, updateAudioForAdmin };
