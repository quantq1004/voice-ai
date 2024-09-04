const { Joi, validate } = require('express-validation');
const { VOICE_STATUS, VOICE_LOCALE, VOICE_GENDER } = require('../constants');

const createVoice = {
  body: Joi.object({
    categoryId: Joi.string().trim().required(),
    name: Joi.string().trim().required(),
    username: Joi.string().trim().required(),
    gender: Joi.string()
      .valid(...Object.values(VOICE_GENDER))
      .required(),
    avatar: Joi.string().trim().optional(),
    locale: Joi.string()
      .valid(...Object.values(VOICE_LOCALE))
      .required(),
    provinceId: Joi.string().trim().optional(),
    description: Joi.string().allow(null, '').trim().optional(),
  }),
};

const updateVoice = {
  body: Joi.object({
    code: Joi.string().trim().optional(),
    index: Joi.string().trim().optional(),
    lastSentenceCode: Joi.string().trim().optional(),
    name: Joi.string().trim().optional(),
    username: Joi.string().trim().optional(),
    gender: Joi.string()
      .valid(...Object.values(VOICE_GENDER))
      .optional(),
    avatar: Joi.string().trim().optional(),
    locale: Joi.string()
      .valid(...Object.values(VOICE_LOCALE))
      .optional(),
    provinceId: Joi.string().trim().optional(),
    description: Joi.string().trim().optional(),
    email: Joi.string().email().trim().lowercase().optional(),
    status: Joi.string()
      .valid(...Object.values(VOICE_STATUS))
      .optional(),
  }),
};

module.exports = {
  createVoiceValidate: validate(createVoice, { keyByField: true }),
  updateVoiceValidate: validate(updateVoice, { keyByField: true }),
};
