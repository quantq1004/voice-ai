const { Joi, validate } = require('express-validation');
const { AUDIO_STATUS } = require('../constants');

const createAudio = {
  body: Joi.object({
    voiceId: Joi.string().trim().required(),
    categoryId: Joi.string().trim().required(),
    sentenceId: Joi.string().trim().required(),
    audioLink: Joi.string().trim().required(),
    quality: Joi.object({
      noiseness: Joi.boolean().required(),
      loudness: Joi.boolean().required(),
      clearly: Joi.boolean().required(),
      speed: Joi.boolean().required(),
    }).required(),
  }),
};

const updateAudio = {
  body: Joi.object({
    audioLink: Joi.string().trim().optional(),
    quality: Joi.object({
      noiseness: Joi.boolean().optional(),
      loudness: Joi.boolean().optional(),
      clearly: Joi.boolean().optional(),
      speed: Joi.boolean().optional(),
    }).optional(),
    sentence: Joi.object({
      code: Joi.string().trim().optional(),
      originalText: Joi.string().trim().optional(),
      normalizedText: Joi.string().trim().optional(),
      nsws: Joi.array()
        .items(
          Joi.object({
            originalText: Joi.string().trim().optional(),
            normalizedText: Joi.string().trim().optional(),
          }),
        )
        .optional(),
    }).optional(),
    status: Joi.string()
      .valid(...Object.values(AUDIO_STATUS))
      .optional(),
  }),
};

module.exports = {
  createAudioValidate: validate(createAudio, { keyByField: true }),
  updateAudioValidate: validate(updateAudio, { keyByField: true }),
};
