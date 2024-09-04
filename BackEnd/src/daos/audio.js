const Audio = require('../models/audio');
const daoUtils = require('./utils');

const createAudio = async ({
  voiceId,
  categoryId,
  sentenceId,
  audioLink,
  quality,
}) => {
  const audio = await Audio.create({
    voiceId,
    categoryId,
    sentenceId,
    audioLink,
    quality,
  });
  return audio;
};

const createAudios = async (audiosData) => {
  const audios = await Audio.insertMany(audiosData);
  return audios;
};

const updateAudioById = async (
  id,
  { audioLink, status, quality: { loudness, noiseness, clearly, speed } },
) => {
  const audio = await Audio.findById(id);

  let { recordedAt } = audio;
  if (!recordedAt) recordedAt = new Date();

  const updatedAudio = await Audio.findByIdAndUpdate(
    id,
    {
      audioLink,
      status,
      recordedAt,
      quality: { loudness, noiseness, clearly, speed },
    },
    {
      new: true,
    },
  );

  return updatedAudio;
};

const findAudios = async (queryFields) => {
  const { documents: audios, total } = await daoUtils.findAll(
    Audio,
    queryFields,
  );
  return { audios, total };
};

const getAudiosByVoiceId = async (voiceId) => {
  const audios = await Audio.find({ voiceId });
  return audios;
};

const getAudioById = async (id) => {
  const audio = await Audio.findById(id);
  return audio;
};

const updateAudioByIdForAdmin = async (id, updateFields) => {
  const audio = await Audio.findByIdAndUpdate(id, updateFields, {
    new: true,
  });
  return audio;
};

module.exports = {
  createAudio,
  createAudios,
  updateAudioById,
  findAudios,
  getAudiosByVoiceId,
  getAudioById,
  updateAudioByIdForAdmin,
};
